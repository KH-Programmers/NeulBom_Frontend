"use client";

import React from "react";
import Link from "next/link";

import clsx from "clsx";

import { BoardCategory } from "../types";
import { useSelectedCategory } from "../utils/routes";

export const SidebarItem: React.FC<{
  category: BoardCategory;
  depth?: number;
}> = ({ category, depth = 0 }) => {
  const isLink = "id" in category;
  const selectedCategory = useSelectedCategory();
  const isSelected = React.useMemo(() => {
    return selectedCategory === category.id;
  }, [selectedCategory, category.id]);

  return (
    <>
      <Link
        href="/app/board/[id]"
        as={`/app/board/${category.id}`}
        className={clsx("block transition-colors p-2 rounded-lg", {
          "hover:bg-black/10 active:bg-black/20 text-black": !isSelected,
          "bg-primary text-white": isSelected,
        })}
        style={{
          marginLeft: 16 * depth,
        }}
      >
        {category.name}
      </Link>
      {category.children &&
        category.children.map((x, i) => (
          <SidebarItem category={x} key={i} depth={depth + 1} />
        ))}
    </>
  );
};
