"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomSpinner from "../Global/Spinner/CustomSpinner";

const withAuth = (WrappedComponent: any) => {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();
    const { data } = useSession();

    const isUser = data?.user.roles?.find((item) => item === "user");

    useEffect(() => {
      if (isUser || !data?.token || undefined || "") {
        router.push("/admin/login");
        return;
      }
    }, [data?.user, isUser, router, data?.token]);

    if (isUser) {
      return <CustomSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
