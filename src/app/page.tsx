import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  return <main className="flex min-h-screen">helllo</main>;
}
