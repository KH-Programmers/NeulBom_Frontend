import React, { PropsWithChildren } from "react";
import { BoardListSidebar } from "./components/Sidebar";
import { BoardCategory } from "./types";

const categories: BoardCategory[] = [
  {
    id: "all",
    name: "전체",
  },
  {
    id: "popular",
    name: "인기글",
  },
  {
    id: "study",
    name: "공부",
    children: [
      {
        id: "questions",
        name: "질문",
        children: [
          {
            id: "question1",
            name: "1학년 과목",
          },
          {
            id: "question2",
            name: "2학년 과목",
          },
          {
            id: "question3",
            name: "3학년 과목",
          },
        ],
      },
      {
        id: "study-verify",
        name: "인증",
      },
    ],
  },
  {
    id: "school",
    name: "학교",
  },
];

const BoardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex gap-4 p-8">
      <BoardListSidebar categories={categories} />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default BoardLayout;
