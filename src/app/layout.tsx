"use client";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Topnav from "./_components/topnav";
import Banner from "./_components/banner";
import { Toaster } from "sonner";
import { AuthComponent } from "./_components/authComponent";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} mx-auto max-w-[1700px]`}>
        <TRPCReactProvider>
          <AuthComponent>
            <Toaster richColors />
            <Topnav />
            <Banner />

            {children}
          </AuthComponent>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
