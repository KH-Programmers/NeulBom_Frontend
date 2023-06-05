import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.cookies.has("token")) {
    const token = request.cookies.get("token");
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
  matcher: "/app/:path*",
};
