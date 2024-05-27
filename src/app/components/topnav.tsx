"use client";

import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
    const router = useRouter();

    return (
      <nav className="fixed flex w-full items-center justify-between border-b p-4 text-2xl font-semibold bg-white">
        <div>T3 Chatroom</div>
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-20">
                <UploadButton endpoint="imageUploader" className= "h-10 text-xs" onClientUploadComplete={() => {
                  router.refresh();
                }} />
                <UserButton />
              </div>
            </SignedIn>
        </div>
      </nav>
    );
  }
