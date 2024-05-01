"use client";

import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function TopNav() {
    const router = useRouter();

    return (
      <nav className="flex w-full items-center justify-between border-b p-4 text-2xl font-semibold">
        <div>T3 Chatroom</div>
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
      </nav>
    );
  }
