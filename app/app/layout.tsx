import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "@/stylesheets/cmdk.scss";
import { GET, POST } from "@utils/request";
import { AppHeader } from "./components/layout/AppHeader";
import { CommandPalette } from "./components/layout/CommandPalette";

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookieStore = cookies();
  const [accessToken, refreshToken, autoLogin] = [cookieStore.get("accessToken"), cookieStore.get("refreshToken"), cookieStore.get("autoLogin")];
  if ((!accessToken || !refreshToken) || (accessToken.value === "" || refreshToken.value === "")) redirect("/signin");
  else {
    const accessTokenValidity = await GET("/user/authentication", accessToken.value);
    if (accessTokenValidity?.status === 401) {
      return redirect("/signin");
    } else if (accessTokenValidity?.status === 406) {
      const requestRefreshToken = await POST("/user/refresh", {}, refreshToken.value);
      if (requestRefreshToken?.status === 200) {
        const newToken: {
          message: string;
          data: {
            accessToken: string;
            refreshToken: string;
          }
        } = await requestRefreshToken.data;
        cookies().set("accessToken", newToken.data.accessToken, { path: "/", maxAge: 60 * 60 * 24 * 8 });
        cookies().set("refreshToken", newToken.data.refreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 });
        cookies().set("autoLogin", autoLogin?.value || 'false', { path: "/", maxAge: autoLogin?.value === 'true' ? 60 * 60 * 24 * 8 : undefined });
      } else {
        return redirect("/signin");
      }
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col">
      <AppHeader />
      <div className="flex pt-[54px] flex-col w-full h-full flex-grow relative">
        <div className="w-full h-full flex flex-col flex-grow">{children}</div>
      </div>
      <CommandPalette />
    </div>
  );
};

export default AppLayout;
