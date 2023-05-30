import React from "react";
import { AppHeader } from "./components/AppHeader";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
};

export default AppLayout;
