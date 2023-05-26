"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (typeof window !== "undefined") {
      if (visited == null) {
        setVisited(true);
        window.location.href = '/welcome';
      } else {
        localStorage.setItem("visited", "true");
        setVisited(false);
      }
    }
  }, []);
  return <div></div>;
};

export default Page;
