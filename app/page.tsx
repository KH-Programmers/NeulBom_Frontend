"use client";

import { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("token");
      const sessionData = sessionStorage.getItem("token");
      if (!localData && !sessionData) {
        window.location.href = "/welcome";
      }
    }
  }, []);
  return <div></div>;
};

export default Page;
