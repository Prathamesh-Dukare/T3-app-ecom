import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Topnav from "./_components/topnav";
import Banner from "./_components/banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ecommerse app",
  description:
    "A Ecommerse app app for checking users interests in different categories",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} mx-auto max-w-[1700px]`}>
        <TRPCReactProvider>
          <Topnav />
          <Banner />

          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
