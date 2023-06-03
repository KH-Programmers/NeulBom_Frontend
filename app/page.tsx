"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const Page: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("token");
      const sessionData = sessionStorage.getItem("token");
      if (!localData && !sessionData) {
        return redirect("/welcome");
      } else {
        return redirect("/app");
      }
    }
  }, []);
  return <div />;
};

export default Page;
