import React from "react";
import clsx from "clsx";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  return (
    <button
      className={clsx(
        className,
        "w-full text-center py-2 text-white bg-primary rounded-lg font-bold hover:brightness-90 active:brightness-75 transition-all"
      )}
      {...props}
    />
  );
};
