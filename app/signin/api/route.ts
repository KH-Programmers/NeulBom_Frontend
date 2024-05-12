import { NextRequest, NextResponse } from "next/server";

import axios, { AxiosError } from "axios";

export async function GET(request: NextRequest) {
  if (request.cookies.has("token")) {
    return NextResponse.json(
      {
        message: "Already logged in",
        code: 200,
      },
      {
        status: 200,
      },
    );
  } else {
    return NextResponse.json(
      {
        message: "Unauthorized",
        code: 401,
      },
      {
        status: 200,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI!}/user/login/`,
      data,
    );
    const accessToken = response.data["data"]["accessToken"];
    const refreshToken = response.data["data"]["refreshToken"];
    if (response.status === 200) {
      const response = NextResponse.json({}, { status: 200 });
      response.cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        maxAge: data["autoLogin"] ? 60 * 60 * 24 * 8 : undefined,
      });
      response.cookies.set("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        maxAge: data["autoLogin"] ? 60 * 60 * 24 * 8 : undefined,
      });
      response.cookies.set({
        name: "autoLogin",
        value: data["autoLogin"] ? "true" : "false",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 8,
      });
      return response;
    }
  } catch (e) {
    const error = e as AxiosError;
    console.error(error);
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
