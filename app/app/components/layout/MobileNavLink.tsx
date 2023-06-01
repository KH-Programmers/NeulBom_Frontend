"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import clsx from "clsx";

export const MobileNavLink: React.FC<
  React.PropsWithChildren<{
    href: LinkProps["href"];
    match: (pathname: string) => boolean;
    icon: IconType;
    as?: string;
  }>
> = ({ children, href, icon: Icon, as, match }) => {
  const path = usePathname();

  const isMatched = React.useMemo(() => {
    return match(path);
  }, [path, match]);

  return (
    <div className="flex relative gap-1">
      <AnimatePresence>
        {isMatched && (
          <motion.div
            layoutId="navLinkHightlightMobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[6px] left-[-10px] top-0 absolute h-full py-[6px]"
          >
            <div className="bg-primary rounded-full w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>
      <Link
        className={clsx(
          "flex-grow w-0 block relative p-2 transition-all rounded-lg active:bg-black/20",
          {
            "hover:bg-black/10": !isMatched,
            "bg-black/10": isMatched,
          }
        )}
        href={href}
        as={as}
      >
        <div className="px-1 flex items-center gap-4 font-semibold">
          <Icon size={24} />
          <div>{children}</div>
        </div>
      </Link>
    </div>
  );
};
