import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { TbCalendar, TbEye, TbUser } from "react-icons/tb";

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

export const PostListItem: React.FC = () => {
  return (
    <Link
      href="/app/posts/1"
      className="bg-white p-4 gap-4 rounded-xl shadow-md hover:shadow-lg transition-all flex"
    >
      <div className="flex-grow w-0">post</div>
      <div className="flex items-center divide-x gap-2 opacity-60">
        <StatItem icon={TbUser}>sans</StatItem>
        <StatItem icon={TbEye}>250</StatItem>
        <StatItem icon={TbCalendar}>23.06.01</StatItem>
      </div>
    </Link>
  );
};
