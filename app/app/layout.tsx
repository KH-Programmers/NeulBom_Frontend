import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <nav>nav</nav>
      {children}
    </div>
  );
};

export default AppLayout;
