import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { WebSocket } from 'ws';
import type { AppRouter } from '~/server/trpc';

globalThis.WebSocket = WebSocket as any;

const wsClient = createWSClient({
  url: `ws://localhost:2022`,
});
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // call subscriptions through websockets and the rest over http
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpLink({
        url: `http://localhost:2022`,
      }),
    }),
  ],
});

async function main() {
  const createMsgRes = await trpc.add.mutate({
    text: 'hello david',
  });
  console.log('createMsgResponse', createMsgRes);

  await new Promise<void>((resolve) => {
    const subscription = trpc.onAdd.subscribe(undefined, {
      onData(data) {
        // ^ note that `data` here is inferred
        console.log('received', data);         
      },
      onError(err) {
        console.error('error', err);
      },
    });

//http://localhost:3000/api/send-message?content=Testingstuff&sent_to=1&user_id=2
