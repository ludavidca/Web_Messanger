import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { messages } from "./db/schema";

export async function getMymessages() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const messages = await db.query.messages.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return messages;
}

