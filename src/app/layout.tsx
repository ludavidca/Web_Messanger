import "~/styles/globals.css";

import { Inter } from "next/font/google";
import TopNav from "./components/topnav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "T3 Chatroom",
  description: "Creating a chatroom with TypeScript, Next.js, and Tailwind CSS, Clerk for Auth and UploadThing for File Uploads",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en">
        <body className={`font-sans ${inter.variable}`}> 
          < TopNav />
          {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
