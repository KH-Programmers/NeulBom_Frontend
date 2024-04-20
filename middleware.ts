import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (token !== undefined) {
    if (
      (
        await fetch(`${process.env.NEXT_PUBLIC_API_URI!}/user/authentication`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token.value}`,
          },
        })
      ).status !== 200
    ) {
      request.cookies.delete("token");
      return NextResponse.rewrite(new URL("/signin", request.url));
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
