import Link from "next/link";
import TopNav from "./components/topnav";
import { messages } from "~/server/db/schema";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Chatbox from "./components/chatbox";

const socket = io("http://localhost:3000");


export function ChatRoom() {
  return (
    <div className="flex-col">
  
      <div className="flex flex-row">
        <div className="w-[50%] mx-10 my-5"/>
        <p className="rounded-lg border border-black w-[50%] p-4 mx-10 my-5">
          The Industrial Revolution was the transition from creating goods by hand to using machines. Its start and end are widely debated by scholars, but the period generally spanned from about 1760 to 1840.Oct 19, 2023
        </p>
      </div>

      <div className="flex flex-row float-right">
        <p className="rounded-lg border border-black p-4 w-[50%] mx-10 my-5">
          The Industrial Revolution was the transition from creating goods by hand to using machines. Its start and end are widely debated by scholars, but the period generally spanned from about 1760 to 1840.Oct 19, 2023
        </p>
        <div className="w-[50%] mx-10 my-5"/>
      </div>
    </div>
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