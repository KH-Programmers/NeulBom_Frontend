import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  if (accessToken !== undefined && refreshToken !== undefined) {
    const TokenValidity = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI!}/user/authentication`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${accessToken.value}`,
        },
      },
    );
    if (!TokenValidity) {
      request.cookies.delete(["accessToken", "refreshToken"]);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (TokenValidity.status === 200) {
      // OK (Access Token Is Valid)
      return NextResponse.next({
        headers: {
          "Set-Cookie": `accessToken=${accessToken.value}; refreshToken=${refreshToken.value} Path=/; HttpOnly; Max-Age=${
            request.cookies.get("autoLogin")?.value === "true"
              ? 60 * 60 * 24 * 7
              : undefined
          }`,
        },
      });
    } else if (TokenValidity.status === 401) {
      // Unauthorized (Access Token Is Not Found)
      request.cookies.delete("accessToken");
      return NextResponse.redirect(new URL("/signin", request.url));
    } else if (TokenValidity.status === 406) {
      // Not Acceptable (Token Expired)
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI!}/user/refresh`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${refreshToken.value}`,
          },
        },
      );
      if (!refreshTokenResponse) {
        request.cookies.delete(["accessToken", "refreshToken"]);
        return NextResponse.rewrite(new URL("/signin", request.url));
      }
      if (refreshTokenResponse.status === 200) {
        const updatedTokens = await refreshTokenResponse.json();
        return NextResponse.next({
          headers: {
            "Set-Cookie": `accessToken=${updatedTokens["accessToken"]}; refreshToken=${updatedTokens["refreshToken"]} Path=/; HttpOnly; Max-Age=${
              request.cookies.get("autoLogin")?.value === "true"
                ? 60 * 60 * 24 * 7
                : undefined
            }`,
          },
        });
      } else {
        request.cookies.delete(["accessToken", "refreshToken"]);
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }
    return NextResponse.next({
      headers: {
        "Set-Cookie": `accessToken=${accessToken.value}; refreshToken=${refreshToken.value} Path=/; HttpOnly; Max-Age=${
          request.cookies.get("autoLogin")?.value === "true"
            ? 60 * 60 * 24 * 7
            : undefined
        }`,
      },
    });
  }
  if ([accessToken, refreshToken].includes(undefined)) {
    request.cookies.delete(["accessToken", "refreshToken"]);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app", "/app/:path*"],
};
