import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { TbCalendar, TbEye, TbUser } from "react-icons/tb";

interface PostListItem {
  title: string;
  author: string;
  viewcounts: number;
  created_at: string;
}

const StatItem: React.FC<React.PropsWithChildren<{ icon: IconType }>> = ({
  icon: Icon,
  children,
}) => {
  return (
    <div className="flex items-center gap-2 pl-2">
      <Icon />
      <div>{children}</div>
    </div>
  );
};

export const PostListItem: React.FC<PostListItem> = ({
  title,
  author,
  viewcounts,
  created_at,
}) => {
  return (
    <Link
      href="/app/posts/1"
      className="bg-white p-4 gap-4 rounded-xl shadow-md hover:shadow-lg transition-all flex"
    >
      <div className="flex-grow w-0">{title}</div>
      <div className="flex items-center divide-x gap-2 opacity-60">
        <StatItem icon={TbUser}>{author}</StatItem>
        <StatItem icon={TbEye}>{viewcounts}</StatItem>
        <StatItem icon={TbCalendar}>{created_at}</StatItem>
      </div>
    </Link>
  );
};
