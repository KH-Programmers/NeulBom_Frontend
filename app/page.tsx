"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const resetCookies = () => {
  "use server";
  if (cookies().has("accessToken")) {
    cookies().delete("accessToken");
  }
  if (cookies().has("refreshToken")) {
    cookies().delete("refreshToken");
  }
  if (cookies().has("autoLogin")) {
    cookies().delete("autoLogin");
  }
};

const setCookies = (
  accessToken: string,
  refreshToken: string,
  autoLogin: boolean,
) => {
  "use server";
  cookies().set("accessToken", accessToken, {
    path: "/",
    httpOnly: true,
    maxAge: autoLogin ? 60 * 60 * 24 * 8 : undefined,
  });
  cookies().set("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    maxAge: autoLogin ? 60 * 60 * 24 * 8 : undefined,
  });
  cookies().set("autoLogin", autoLogin ? "true" : "false", {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 8,
  });
};

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  if (accessToken !== undefined && refreshToken !== undefined) {
    const TokenValidity = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/user/authentication`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${accessToken.value}`,
        },
      },
    );
    if (TokenValidity?.status === 200) {
      return redirect("/app");
    } else {
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI!}/user/refresh`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${refreshToken.value}`,
          },
        },
      );
      if (refreshTokenResponse.status === 200) {
        const updatedTokens: {
          message: string;
          data: {
            accessToken: string;
            refreshToken: string;
          };
        } = await refreshTokenResponse.json();
        setCookies(
          updatedTokens.data.accessToken,
          updatedTokens.data.refreshToken,
          cookieStore.get("autoLogin")?.value === "true",
        );
        return redirect("/app");
      } else {
        resetCookies();
        return redirect("/signin");
      }
    }
  }
  if ([accessToken, refreshToken].includes(undefined)) {
    resetCookies();
    return redirect("/signin");
  }
  return redirect("/app");
};

export default Page;
