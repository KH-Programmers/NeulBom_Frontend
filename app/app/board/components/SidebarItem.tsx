"use client";

import React from "react";
import { BoardCategory } from "../types";
import Link from "next/link";
import { useSelectedCategory } from "../utils/routes";
import clsx from "clsx";

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
      {isLink ? (
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
      ) : (
        <div
          className="p-2"
          style={{
            marginLeft: 16 * depth,
          }}
        >
          {category.name}
        </div>
      )}
      {category.children &&
        category.children.map((x, i) => (
          <SidebarItem category={x} key={i} depth={depth + 1} />
        ))}
    </>
  );
};
