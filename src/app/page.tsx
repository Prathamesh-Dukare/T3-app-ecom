"use client";

import { api } from "@/trpc/react";

export default function Home() {
  const hello = api.user.greeting.useQuery();
  console.log(hello.data, "helo00");

  return <main className="flex min-h-screen">helllo</main>;
}
