"use client";

import { useEffect } from "react";
import userAuthUser from "../utils/hooks";

export default function Home() {
  const { user, loading } = userAuthUser();

  useEffect(() => {
    console.log(user, "IN PAGE");
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="home flex min-h-screen">
      {user && <h1>user : {user.name as string}</h1>}
    </main>
  );
}
