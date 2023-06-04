"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("token");
      const sessionData = sessionStorage.getItem("token");
      if (!localData && !sessionData) {
        return router.push("/welcome");
      } else {
        return router.push("/app");
      }
    }
  }, [router]);
  return <div />;
};

export default Page;
