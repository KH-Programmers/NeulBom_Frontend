import React from "react";

export type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE8FF] via-[#E2E8F0] to-[#FFFCED]">
      {children}
    </div>
  );
};

export default Layout;
