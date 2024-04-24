import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GET } from "@/utils/request";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (token !== undefined) {
    const TokenValidity = await GET("/user/authentication", token.value);
    if (TokenValidity.status === 401) {
      // Unauthorized (Token Not Found)
      request.cookies.delete("token");
      return NextResponse.rewrite(new URL("/signin", request.url));
    } else if (TokenValidity.status === 406) {
      // Not Acceptable (Token Expired)
      await GET("/user/refresh", token.value);
    }
    return NextResponse.next({
      headers: {
        "Set-Cookie": `token=${token!.value}; Path=/; HttpOnly; Max-Age=${
          request.cookies.get("autoLogin")?.value === "true"
            ? 60 * 60 * 24 * 7
            : undefined
        }`,
      },
    });
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app", "/app/:path*"],
};
