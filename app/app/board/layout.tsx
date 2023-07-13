import React, { PropsWithChildren } from "react";
import { BoardListSidebar } from "./components/Sidebar";
import { BoardCategory } from "./types";

const categories: BoardCategory[] = [
  {
    id: "popular",
    name: "인기글",
  },
  {
    id: "study",
    name: "공부",
  },
  {
    id: "school",
    name: "학교생활",
  },
  {
    id: "entertainment",
    name: "컨텐츠",
  },
  {
    id: "sports",
    name: "스포츠",
  }
];

const BoardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-8">
      <BoardListSidebar categories={categories} />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default BoardLayout;
