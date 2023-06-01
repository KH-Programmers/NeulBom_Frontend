import React from "react";
import { IconType } from "react-icons";

export const MobileNavButton: React.FC<
  React.PropsWithChildren<{
    icon: IconType;
    onClick?: () => void;
  }>
> = ({ icon: Icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block relative p-2 transition-all rounded-lg hover:bg-black/10 active:bg-black/20"
    >
      <div className="px-1 flex items-center gap-4 font-semibold">
        <Icon size={24} />
        <div>{children}</div>
      </div>
    </button>
  );
};
