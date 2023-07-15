import React from "react";
import { BoardCategory } from "../types";
import { SidebarItem } from "./SidebarItem";
import Link from "next/link";

export const BoardListSidebar: React.FC<{
  categories: BoardCategory[];
}> = ({ categories }) => {
  return (
    <div className="static md:sticky top-[88px] self-start bg-white p-4 w-full md:w-fit min-w-[260px] rounded-xl shadow-md">
      {categories.map((x, i) => (
        <SidebarItem key={i} category={x} />
      ))}
      <Link
        href="/app/posts/"
        className="text-center mt-10 block transition-colors p-1 rounded-lg bg-primary text-white"
      >
        글쓰기
      </Link>
    </div>
  );
};
