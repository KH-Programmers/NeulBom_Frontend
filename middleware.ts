import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const [accessToken, autoLogin] = [
    cookieStore.get("accessToken"),
    cookieStore.get("autoLogin"),
  ];
  if (!accessToken) {
    return NextResponse.rewrite(new URL("/signin", request.url));
  }
  const requestTokenValidity = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/user/authentication`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${accessToken.value}`,
      },
    },
  );

  if (requestTokenValidity?.status === 401) {
    return NextResponse.rewrite(new URL("/signin", request.url));
  } else {
    let response;
    const newToken: {
      accessToken: string;
      refreshToken: string;
      autoLogin: string;
    } = await requestTokenValidity.json();

    const path = request.nextUrl.pathname;
    if (path === "/") {
      response = NextResponse.rewrite(new URL("/app", request.url));
    } else {
      response = NextResponse.next();
    }
    response.cookies.set("accessToken", newToken.accessToken, {
      path: "/",
      secure: true,
      httpOnly: true,
      expires:
        autoLogin?.value === "true"
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
          : undefined,
    });
    response.cookies.set("autoLogin", newToken.autoLogin, {
      path: "/",
      secure: true,
      httpOnly: true,
      expires:
        autoLogin?.value === "true"
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
          : undefined,
    });
    return response;
  }
}

export const config = {
  matcher: ["/", "/app/:path*"],
};
