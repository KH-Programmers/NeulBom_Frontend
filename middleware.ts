import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const [accessToken, refreshToken, autoLogin] = [
    cookieStore.get("accessToken"),
    cookieStore.get("refreshToken"),
    cookieStore.get("autoLogin"),
  ];
  if (!accessToken && !refreshToken) {
    return NextResponse.rewrite(new URL("/signin", request.url));
  }
  const requestTokenValidity = await fetch(
    `${process.env.NEXT_PUBLIC_URI}/api/token${accessToken ? `?accessToken=${accessToken.value}` : ""}${refreshToken ? `&refreshToken=${refreshToken.value}` : ""}&autoLogin=${autoLogin?.value || "false"}`,
    {
      method: "GET",
    },
  );

  if (requestTokenValidity.status === 401) {
    return NextResponse.rewrite(new URL("/signin", request.url));
  }
  if (requestTokenValidity.status === 201) {
    ("use server");
    const newToken: {
      accessToken: string;
      refreshToken: string;
      autoLogin: string;
    } = await requestTokenValidity.json();
    cookies().set("accessToken", newToken.accessToken, {
      maxAge: newToken.autoLogin === "true" ? 60 * 60 * 24 * 8 : undefined,
      httpOnly: true,
    });
    cookies().set("refreshToken", newToken.refreshToken, {
      maxAge: newToken.autoLogin === "true" ? 60 * 60 * 24 * 30 : undefined,
      httpOnly: true,
    });
    cookies().set("autoLogin", newToken.autoLogin, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
  }
  const path = request.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.rewrite(new URL("/app", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
