import { NextRequest, NextResponse } from "next/server";

import axios, { AxiosError } from "axios";

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
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URI!}/user/authentication`, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    });
    return NextResponse.json(
      {
        message: "Authorized",
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401) {
      request.cookies.delete(["accessToken", "refreshToken"]);
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    } else if (error.response?.status === 406) {
      const response = NextResponse.json(
        {
          message: "Authorized",
        },
        {
          status: 200,
        },
      );
      try {
        const refreshTokenValidity = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URI!}/user/refresh`,
          {},
          {
            headers: {
              Authorization: `Token ${refreshToken}`,
            },
          },
        );
        const newToken: {
          message: string;
          data: {
            accessToken: string;
            refreshToken: string;
          };
        } = await refreshTokenValidity.data;

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
      } catch {
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
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
  }
}
