"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const AuthComponent = React.memo(function Auth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log("AuthComponent");

    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("authToken="))
      ?.split("=")[1];

    const isOnprivateRoute = window.location.pathname === "/";
    const isOnPublicRoute =
      window.location.pathname === "/login" ||
      window.location.pathname === "/signup";

    if (token && isOnPublicRoute) {
      router.push("/");
    }
    if (!token && isOnprivateRoute) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
});
