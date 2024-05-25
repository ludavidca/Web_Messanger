import Link from "next/link";
import TopNav from "./components/topnav";
import { messages } from "~/server/db/schema";
//import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chatbox from "./components/chatbox";
import { getMymessages } from "~/server/queries";

const socket = io("http://localhost:3000");

async function Messages() {
  const messages = await getMymessages();
  return (
    <div className="flex-col">
      {messages.map((message) => (
      <div className={`flex-row w-full`}>
          <p className={`rounded-lg border border-black p-4 mx-10 my-5 ${parseInt(message.sentId) % 2 === 0 ? 'bg-white' : 'bg-rose-300	'}`}>{message.content}</p>
        </div>
      ))}
    </div>
  );

}

function ChatRoom() {
  return (
      <Messages />
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen justify-center">
      <ChatRoom />
      <Chatbox />
    </main>
  );
}