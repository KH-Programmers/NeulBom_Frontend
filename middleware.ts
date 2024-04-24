import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const response = NextResponse.next();
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
      return NextResponse.rewrite(new URL("/signin", request.url));
    }
    if (TokenValidity.status === 200) {
      // OK (Access Token Is Valid)
      response.cookies.set("accessToken", accessToken.value, {
        path: "/",
        httpOnly: true,
        maxAge:
          request.cookies.get("autoLogin")?.value === "true"
            ? 60 * 60 * 24 * 8
            : undefined,
      });
      response.cookies.set("refreshToken", refreshToken.value, {
        path: "/",
        httpOnly: true,
        maxAge:
          request.cookies.get("autoLogin")?.value === "true"
            ? 60 * 60 * 24 * 8
            : undefined,
      });
      return response;
    } else if (TokenValidity.status === 401) {
      // Unauthorized (Access Token Is Not Found)
      request.cookies.delete(["accessToken", "refreshToken"]);
      return NextResponse.rewrite(new URL("/signin", request.url));
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
        response.cookies.set("accessToken", updatedTokens["accessToken"], {
          path: "/",
          httpOnly: true,
          maxAge:
            request.cookies.get("autoLogin")?.value === "true"
              ? 60 * 60 * 24 * 8
              : undefined,
        });
        response.cookies.set("refreshToken", updatedTokens["refreshToken"], {
          path: "/",
          httpOnly: true,
          maxAge:
            request.cookies.get("autoLogin")?.value === "true"
              ? 60 * 60 * 24 * 8
              : undefined,
        });
        return response;
      } else {
        request.cookies.delete(["accessToken", "refreshToken"]);
        return NextResponse.rewrite(new URL("/signin", request.url));
      }
    }
    response.cookies.set("accessToken", accessToken.value, {
      path: "/",
      httpOnly: true,
      maxAge:
        request.cookies.get("autoLogin")?.value === "true"
          ? 60 * 60 * 24 * 8
          : undefined,
    });
    response.cookies.set("refreshToken", refreshToken.value, {
      path: "/",
      httpOnly: true,
      maxAge:
        request.cookies.get("autoLogin")?.value === "true"
          ? 60 * 60 * 24 * 8
          : undefined,
    });
    return response;
  }
  console.log(accessToken);
  console.log(refreshToken);
  if ([accessToken, refreshToken].includes(undefined)) {
    request.cookies.delete(["accessToken", "refreshToken"]);
    return NextResponse.rewrite(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app", "/app/:path*"],
};
