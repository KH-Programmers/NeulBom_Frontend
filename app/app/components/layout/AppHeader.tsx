"use client";

import React from "react";
import NeulBom from "@/assets/NeulBom.svg";
import Image from "next/image";
import { NavLink } from "./NavLink";
import Link from "next/link";
import {
  TbBell,
  TbCalendar,
  TbMenu,
  TbPencil,
  TbSearch,
  TbSoup,
  TbUserCircle,
} from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { MobileNavLink } from "./MobileNavLink";
import { MobileNavButton } from "./MobileNavButton";
import { NavPopupButton } from "@/components/NavPopupButton";
import { MobilePopupMenu } from "./MobilePopupMenu";
import { LogoutButton } from './logoutButton'
import { NotificationPopupContent } from "../notification/NotificationPopupContent";

const AppHeaderContent: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-4 flex-grow">
      {/* nav links */}
      <div className="flex gap-2">
        <NavLink
          href="/app/board/popular"
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
        {/*<NavLink
          href="/app/events"
          match={(path) => path.startsWith("/app/events")}
        >
          학사일정
        </NavLink>*/}
      </div>
      {/* spacer */}
      <div className="flex-grow"></div>
      <div className="pr-2 flex gap-4 items-center">
        <button>
          <TbSearch
            className="text-black hover:text-primary transition-colors"
            size={24}
          />
        </button>
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
        <NavPopupButton fullHeight buttonContent={<TbUserCircle
            className="text-black hover:text-primary transition-colors"
            size={24}
          />}>
          <div className="flex w-full h-full flex-col">
            <div className="border-b px-4 py-2">
              <div className='inline font-bold sticky top-0 bg-white'>
                내 정보
              </div>
              {/*<LogoutButton />*/}
            </div>
          </div>
        </NavPopupButton>
      </div>
    </div>
  );
};

const AppMobileHeaderContent: React.FC = () => {
  const [notificationPopup, setNotificationPopup] = React.useState(false);

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
        icon={TbSoup}
        href="/app/meals"
        match={(path) => path.startsWith("/app/meals")}
      >
        급식
      </MobileNavLink>
      {/*<MobileNavLink
        icon={TbCalendar}
        href="/app/events"
        match={(path) => path.startsWith("/app/events")}
      >
        학사일정
      </MobileNavLink>*/}
      <MobileNavButton onClick={() => setNotificationPopup(true)} icon={TbBell}>
        알림
      </MobileNavButton>
      <MobileNavButton onClick={() => alert("TODO")} icon={TbUserCircle}>
        (username)
      </MobileNavButton>
    </div>
  );
};

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full bg-white shadow z-[99999]">
      <div className="h-[54px] w-full flex items-center px-2 gap-4 z-50">
        <Link href="/app">
          <Image src={NeulBom} alt="logo" width={40} height={40} />
        </Link>
        <AppHeaderContent />
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
              <AppMobileHeaderContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
