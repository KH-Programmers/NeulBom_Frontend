import React from "react";
import { BoardCategory } from "../types";
import { SidebarItem } from "./SidebarItem";

export const BoardListSidebar: React.FC<{
  categories: BoardCategory[];
}> = ({ categories }) => {
  return (
    <div className="sticky top-[88px] self-start bg-white p-4 min-w-[260px] rounded-xl shadow-md">
      {categories.map((x, i) => (
        <SidebarItem key={i} category={x} />
      ))}
    </div>
  );
};
