'use server';

import React from "react";

import "@stylesheets/cmdk.scss";
import { AppHeader } from "./components/layout/AppHeader";
import { CommandPalette } from "./components/layout/CommandPalette";

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex pt-[54px] flex-col w-full h-full flex-grow relative">
        <div className="w-full h-full flex flex-col flex-grow">{children}</div>
      </div>
      <CommandPalette />
    </div>
  );
};

export default AppLayout;
