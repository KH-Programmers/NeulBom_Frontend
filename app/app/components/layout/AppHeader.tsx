"use client";

import React from "react";
import NeulBom from "@/assets/NeulBom.svg";
import Image from "next/image";
import { NavLink } from "./NavLink";
import Link from "next/link";
import { TbNotification, TbSearch, TbUserCircle } from "react-icons/tb";

export const AppHeader: React.FC = () => {
  return (
    <div className="sticky top-0 w-full h-[54px] bg-white shadow flex items-center px-2 gap-4">
      <Link href="/app">
        <Image src={NeulBom} alt="logo" width={40} height={40} />
      </Link>
      {/* nav links */}
      <div className="flex gap-2">
        <NavLink
          href="/app/board"
          match={(path) => path.startsWith("/app/board")}
        >
          게시판
        </NavLink>
        <NavLink
          href="/app/meals"
          match={(path) => path.startsWith("/app/meals")}
        >
          급식
        </NavLink>
        <NavLink
          href="/app/events"
          match={(path) => path.startsWith("/app/events")}
        >
          학사일정
        </NavLink>
      </div>
      {/* spacer */}
      <div className="flex-grow"></div>
      <div className="pr-2 flex gap-4 items-center">
        <button onClick={() => alert("TODO")}>
          <TbSearch
            className="text-black hover:text-primary transition-colors"
            size={24}
          />
        </button>
        <button onClick={() => alert("TODO")}>
          <TbNotification
            className="text-black hover:text-primary transition-colors"
            size={24}
          />
        </button>
        <button onClick={() => alert("TODO")}>
          <TbUserCircle
            className="text-black hover:text-primary transition-colors"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};
