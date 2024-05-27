import Link from "next/link";
import TopNav from "./components/topnav";
//import { useEffect, useState } from "react";
import Chatbox from "./components/chatbox";
import { getMymessages } from "~/server/queries";
import { useRouter } from "next/router";


async function Messages() {
  const messages = await getMymessages();
  return (
    <div>
      <div className="h-20 bg-transparent"></div>
      <div className="flex flex-col justify-center overflow-y-auto">
        {messages.map((message) => (

          <div className={`flex-row max-h-screen`}>
            {message.isimage === 'yes' ? (
              <img
                src={message.content}
                alt="Message Image"
                className={`rounded-lg border border-black p-4 mx-10 my-5 ${
                  parseInt(message.sent_to) % 2 === 0 ? 'bg-white' : 'bg-rose-300'
                }`}
              />
            ) : (
              <p
                className={`rounded-lg border border-black p-4 mx-10 my-5 ${
                  parseInt(message.sent_to) % 2 === 0 ? 'bg-white' : 'bg-rose-300'
                }`}
              >
                {message.content}
              </p>
            )}
          </div>
        ))}
        </div>
        <div className="h-20 bg-transparent"></div>
      </div>
  );

}

export default function HomePage() {
  return (
    <main className="">
        <Messages />
      <Chatbox />
    </main>
  );
}