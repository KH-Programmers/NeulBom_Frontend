"use client";

import { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = [
        localStorage.getItem("accessToken"),
        localStorage.getItem("refreshToken"),
      ];
      const sessionData = [
        sessionStorage.getItem("accessToken"),
        sessionStorage.getItem("refreshToken"),
      ];
      if (!localData[0] && !localData[1] && !sessionData[0] && !sessionData[1]) {
        window.location.href = '/welcome';
      }
    }
  }, []);
  return <div></div>;
};

export default Page;
