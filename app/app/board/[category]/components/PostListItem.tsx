import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { TbCalendar, TbEye, TbUser } from "react-icons/tb";

interface PostListItem {
  id: string;
  title: string;
  username: string;
  viewCount: number;
  createdAt: string;
  commentCount: number;
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
  id,
  title,
  username,
  createdAt,
  viewCount,
  commentCount,
}) => {
  return (
    <Link
      href={`/app/posts/${id}`}
      className="bg-white p-4 gap-4 rounded-xl shadow-md hover:shadow-lg transition-all flex"
    >
      <div className="flex-grow w-0">{title}</div>
      <div className="flex items-center divide-x gap-2 opacity-60">
        <StatItem icon={TbUser}>익명{/*username 익명 기능 추가*/}</StatItem>
        <StatItem icon={TbEye}>{viewCount}</StatItem>
        <StatItem icon={TbCalendar}>{createdAt}</StatItem>
      </div>
    </Link>
  );
};
