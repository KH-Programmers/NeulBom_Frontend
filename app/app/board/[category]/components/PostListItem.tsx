import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { TbCalendar, TbEye, TbUser, TbMessages } from "react-icons/tb";
import { User } from "../../types";
import clsx from "clsx";

interface PostListItem {
  id: string;
  title: string;
  user: User;
  viewCount: number;
  createdAt: string;
  commentCount: number;
}

const StatItem: React.FC<
  React.PropsWithChildren<{ icon: IconType; className?: string }>
> = ({ icon: Icon, children, className }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 last:border-r-0 border-r pr-2",
        className,
      )}
    >
      <Icon />
      <div>{children}</div>
    </div>
  );
};

export const PostListItem: React.FC<PostListItem> = ({
  id,
  title,
  user,
  createdAt,
  viewCount,
  commentCount,
}) => {
  return (
    <Link
      href={`/app/posts/${id}`}
      className="bg-white p-4 gap-2 lg:gap-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col lg:flex-row"
      prefetch={false}
    >
      <div className="lg:hidden opacity-60">
        <StatItem icon={TbUser}>{user.IsAdmin ? "관리자" : "익명"}</StatItem>
      </div>
      <div className="flex-grow flex-shrink-0">{title}</div>
      <div className="flex items-center gap-2 opacity-60">
        <StatItem className="hidden lg:flex" icon={TbUser}>
          {user.IsAdmin ? "관리자" : "익명"}
        </StatItem>
        <StatItem icon={TbEye}>{viewCount}</StatItem>
        <StatItem icon={TbCalendar}>{createdAt}</StatItem>
        <StatItem icon={TbMessages}>{commentCount}</StatItem>
      </div>
    </Link>
  );
};
