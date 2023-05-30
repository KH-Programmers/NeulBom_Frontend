"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const NavLink: React.FC<
  React.PropsWithChildren<{
    href: LinkProps<any>["href"];
    match: (pathname: string) => boolean;
    as?: string;
  }>
> = ({ children, href, as, match }) => {
  const path = usePathname();

  const isMatched = React.useMemo(() => {
    return match(path);
  }, [path, match]);

  return (
    <Link className="block relative" href={href} as={as}>
      {/* text */}
      <div className="px-2 text-lg font-semibold">{children}</div>
      {/* underline(active display) */}
      <AnimatePresence>
        {isMatched && (
          <motion.div
            layoutId="navLinkHightlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full absolute h-[4px] bottom-[-6px] bg-primary rounded-full"
          ></motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
