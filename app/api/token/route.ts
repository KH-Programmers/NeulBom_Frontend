import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.search);
  const [accessToken, refreshToken, autoLogin] = [
    searchParams.get("accessToken"),
    searchParams.get("refreshToken"),
    searchParams.get("autoLogin"),
  ];
  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  const accessTokenValidity = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI!}/user/authentication`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    },
  );
  console.log(await accessTokenValidity.json());
  if (accessTokenValidity?.status === 401) {
    request.cookies.delete(["accessToken", "refreshToken"]);
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  } else if (accessTokenValidity?.status === 406) {
    const refreshTokenValidity = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI!}/user/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      },
    );
    const response = NextResponse.json(
      {
        message: "Authorized",
      },
      {
        status: 200,
      },
    );
    if (refreshTokenValidity?.status === 200) {
      const newToken: {
        message: string;
        data: {
          accessToken: string;
          refreshToken: string;
        };
      } = await refreshTokenValidity.json();

      response.cookies.set("accessToken", newToken.data.accessToken, {
        maxAge: autoLogin === "true" ? 60 * 60 * 24 * 8 : undefined,
        httpOnly: true,
      });
      response.cookies.set("refreshToken", newToken.data.refreshToken, {
        maxAge: autoLogin === "true" ? 60 * 60 * 24 * 30 : undefined,
        httpOnly: true,
      });
      response.cookies.set("autoLogin", autoLogin || "false", {
        maxAge: autoLogin === "true" ? 60 * 60 * 24 * 30 : undefined,
        httpOnly: true,
      });
      return NextResponse.json(
        {
          accessToken: newToken.data.accessToken,
          refreshToken: newToken.data.refreshToken,
          autoLogin: autoLogin || "false",
        },
        {
          status: 201,
        },
      );
    } else {
      request.cookies.delete(["accessToken", "refreshToken"]);
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Authorized",
      },
      {
        status: 200,
      },
    );
  }
}
