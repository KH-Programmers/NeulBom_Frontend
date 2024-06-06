"use server";

import React from "react";
import { cookies } from "next/headers";

import "@stylesheets/cmdk.scss";

import { User } from "./types";
import { GET } from "@utils/request";
import { AppHeader } from "./components/layout/AppHeader";
import { CommandPalette } from "./components/layout/CommandPalette";

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const accessToken = cookies().get("accessToken");
  const user: {
    message: string;
    data: User;
  } = await (await GET("/user/", accessToken?.value))!.data;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <AppHeader user={user.data} token={accessToken!.value} />
      <div className="flex pt-[54px] flex-col w-full h-full flex-grow relative">
        <div className="w-full h-full flex flex-col flex-grow">{children}</div>
      </div>
      <CommandPalette />
    </div>
  );
};

export default AppLayout;
