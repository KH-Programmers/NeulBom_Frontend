import React, { PropsWithChildren } from "react";

export const MainCard: React.FC<
  PropsWithChildren<{ title: React.ReactNode }>
> = ({ title, children }) => {
  return (
    <div className="w-full h-auto bg-white rounded-xl shadow">
      <div className="border-b p-4 text-center font-bold text-lg">{title}</div>
      <div className="h-full">{children}</div>
    </div>
  );
};
