"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/store/useAdminAuth";

const withAuth = (WrappedComponent: any) => {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();
    const { roles, isLoggedIn } = useAdminAuth();

    const isUser = roles?.find((item) => item === "user");

    useEffect(() => {
      if (isUser || undefined || "" || !isLoggedIn) {
        router.push("/admin/login");
        return;
      }
    }, [isUser, router, isLoggedIn]);

    if (isUser) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
