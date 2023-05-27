"use client";

import { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("visited") == null) {
        localStorage.setItem("visited", "true");
        window.location.href = '/welcome';
      }
    }
  }, []);
  return <div></div>;
};

export default Page;
