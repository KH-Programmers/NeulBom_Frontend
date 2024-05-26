import React, { PropsWithChildren } from "react";
import { cookies } from "next/headers";

import { GET } from "@utils/request";
import { BoardCategory } from "./types";
import { BoardListSidebar } from "./components/Sidebar";

const BoardLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  let user: {
    isSuper: boolean;
  } = {
    isSuper: false,
  };
  let categories: BoardCategory[] = [];
  try {
    const requestBoardData = await GET("/board/");
    await requestBoardData!.data.map((category: BoardCategory) => {
      categories.push(category);
    });
  } catch (e) {
    console.error(e);
  }
  try {
    const requestUserData = await GET("/user/isValidation/", token!.value);
    user = requestUserData!.data;
  } catch (e) {
    console.error(e);
  }
  return (
    <div className="flex flex-col md:flex-row gap-4 p-8">
      <BoardListSidebar categories={categories} isSuper={user.isSuper} />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default BoardLayout;
