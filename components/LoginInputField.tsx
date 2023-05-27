import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons/lib";

export const LoginInputField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon: IconType;
  }
> = ({ className, icon: Icon, ...props }) => {
  return (
    <div className="flex items-center gap-2 p-2">
      {<Icon size={28} />}
      <div className="w-0 flex-grow">
        <input
          className={clsx(
            className,
            "bg-transparent text-lg w-full h-full focus:outline-none font-bold"
          )}
          {...props}
        />
      </div>
    </div>
  );
};
