"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { User } from "../../types";
import { NavLink } from "./NavLink";
import NeulBom from "@assets/NeulBom.svg";
import { MobileNavLink } from "./MobileNavLink";
import { MobileNavButton } from "./MobileNavButton";
import { MobilePopupMenu } from "./MobilePopupMenu";
import { NavPopupButton } from "@components/NavPopupButton";
import { NotificationPopupContent } from "../notification/NotificationPopupContent";

import { GoPerson } from "react-icons/go";
import {
  TbBell,
  TbLogout,
  TbMenu,
  TbPencil,
  TbSettings,
  TbUserCircle,
} from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { GET, POST } from "@utils/request";

const AppHeaderContent: React.FC<{
  user: User;
  token: string;
}> = ({ user, token }) => {
  const router = useRouter();
  return (
    <div className="hidden md:flex items-center gap-4 flex-grow">
      <div className="flex gap-2">
        <NavLink
          href="/app/board/popular"
          match={(path) => path.startsWith("/app/board")}
        >
          게시판
        </NavLink>
        <NavLink
          href="/app/studentCard"
          match={(path) => path.startsWith("/app/studentCard")}
        >
          학생증
        </NavLink>
      </div>
      <div className="flex-grow"></div>
      <div className="pr-2 flex gap-4 items-center">
        <NavPopupButton fullHeight buttonContent={<TbBell size={24} />}>
          <div className="flex w-full h-full flex-col">
            <div className="border-b px-4 py-2 text-lg font-bold sticky top-0 bg-white">
              알림
            </div>
            <div className="flex-grow">
              <NotificationPopupContent />
            </div>
          </div>
        </NavPopupButton>
        <NavPopupButton
          fullHeight
          buttonContent={
            <TbUserCircle
              className="text-black hover:text-primary transition-colors"
              size={24}
            />
          }
        >
          <div className="flex w-full h-4/5 flex-col">
            <div className="border-b px-4 py-2">
              <div className="inline font-bold sticky top-0 bg-white">
                내 정보
              </div>
            </div>
            <div className="h-full flex items-center mx-auto">
              <div className="text-center">
                <GoPerson size={96} className="mx-auto" />
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <h2 className="text-2xl font-light text-gray-500">
                  {user.studentId}
                </h2>
                <h3 className="text-xl font-bold text-gray-500">
                  {user.isSuper ? "관리자" : user.isTeacher ? "교사" : ""}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex">
            <Link
              className="flex rounded-xl bg-blue-400 text-white py-2 px-4 mx-auto gap-2"
              href="/app/preferences"
            >
              <TbSettings size={24} />
              설정
            </Link>
            <button
              className="flex rounded-xl bg-red-400 text-white py-2 px-4 mx-auto gap-2"
              onClick={async () => {
                await POST("/user/logout", {}, token);
                document.cookie =
                  "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.replace("/signin");
              }}
            >
              <TbLogout size={24} />
              로그아웃
            </button>
          </div>
        </NavPopupButton>
      </div>
    </div>
  );
};

const AppMobileHeaderContent: React.FC<{
  user: User;
  token: string;
}> = ({ user, token }) => {
  const [notificationPopup, setNotificationPopup] = React.useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-1">
      <MobilePopupMenu
        title="알림"
        open={notificationPopup}
        onClose={() => setNotificationPopup(false)}
      >
        <NotificationPopupContent />
      </MobilePopupMenu>

      <MobileNavLink
        icon={TbPencil}
        href="/app/board/all"
        match={(path) => path.startsWith("/app/board")}
      >
        게시판
      </MobileNavLink>
      <MobileNavLink
        icon={TbUserCircle}
        href="/app/studentCard"
        match={(path) => path.startsWith("/app/studentCard")}
      >
        학생증
      </MobileNavLink>
      <MobileNavButton onClick={() => setNotificationPopup(true)} icon={TbBell}>
        알림
      </MobileNavButton>
      <MobileNavButton
        onClick={() => router.push("/app/preferences")}
        icon={TbUserCircle}
      >
        {user.name}
      </MobileNavButton>
      <MobileNavButton
        onClick={async () => {
          await POST("/user/logout", {}, token);
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          router.replace("/signin");
        }}
        icon={TbLogout}
      >
        로그아웃
      </MobileNavButton>
    </div>
  );
};

export const AppHeader: React.FC<{
  user: User;
  token: string;
}> = ({ user, token }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full bg-white shadow z-[99999]">
      <div className="h-[54px] w-full flex items-center px-2 gap-4 z-50">
        <Link href="/app">
          <Image src={NeulBom} alt="logo" width={40} height={40} />
        </Link>
        <AppHeaderContent user={user} token={token} />
        <div className="flex-grow block md:hidden"></div>
        <button
          className="justify-self-end block md:hidden p-2 transition-all hover:bg-black/10 active:bg-black/20 rounded-full"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <TbMenu size={24} />
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden block md:hidden"
          >
            <div className="border-t p-4">
              <AppMobileHeaderContent user={user} token={token} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
