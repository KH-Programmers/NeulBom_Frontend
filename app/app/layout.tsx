import React from "react";
import { AppHeader } from "./components/layout/AppHeader";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      {children}
    </div>
  );
};

export default AppLayout;
