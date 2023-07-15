"use client";

import React from "react";
import { BoardCategory } from "../types";
import { SidebarItem } from "./SidebarItem";
import Link from "next/link";
import { useSelectedCategory } from '../utils/routes';

export const BoardListSidebar: React.FC<{
  categories: BoardCategory[];
}> = ({ categories }) => {
  const selectedCategory = useSelectedCategory();
  return (
    <div className="static md:sticky top-[88px] self-start bg-white p-4 w-full md:w-fit min-w-[260px] rounded-xl shadow-md">
      {categories.map((x, i) => (
        <SidebarItem key={i} category={x} />
      ))}
      <Link
        href={{
          pathname: '/app/posts',
          query: { category : selectedCategory },
        }}
        prefetch={false}
        className="text-center mt-10 block transition-colors p-1 rounded-lg bg-primary text-white"
      >
        글쓰기
      </Link>
    </div>
  );
};
