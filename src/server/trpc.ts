import { initTRPC } from '@trpc/server';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { EventEmitter } from 'events';
import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { observable } from '@trpc/server/observable';
import { WebSocketServer } from 'ws';
import { z } from 'zod';
import { Message } from 'postcss';

// This is how you initialize a context for the server
function createContext(
  opts: CreateHTTPContextOptions | CreateWSSContextFnOptions,
) {
  return {};
}
type Context = Awaited<ReturnType<typeof createContext>>;

const ee = new EventEmitter();
const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = t.router({
  onAdd: t.procedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable<Message>((emit) => {
      const onAdd = (data: Message) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
  add: t.procedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        text: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      const post = { ...opts.input }; /* [..] add to db */
      ee.emit('add', post);
      return post;
    }),
});


export type AppRouter = typeof appRouter;
 
// http server
const server = createHTTPServer({
  router: appRouter,
  createContext,
});

// ws server
const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

setInterval(() => {
  console.log('Connected clients', wss.clients.size);
}, 1000);
server.listen(2022);