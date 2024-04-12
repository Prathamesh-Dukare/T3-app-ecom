import { useEffect, useState } from "react";
import { api } from "../trpc/react";
import { useRouter } from "next/navigation";

export default function userAuthUser() {
  const currentUser = api.user.getUser.useQuery();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (currentUser.isLoading) {
      setLoading(true);
    }

    if (currentUser.error?.message === "UNAUTHORIZED") {
      setLoading(false);
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
    }

    if (currentUser.data) {
      setLoading(false);
      setUser({
        id: currentUser.data.id,
        name: currentUser.data.name,
        email: currentUser.data.email,
      });
    }
  }, [currentUser.status, currentUser.data]);

  return { user, loading };
}
