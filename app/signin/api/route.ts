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
    const LoginResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI!}/user/login/`,
      data,
    );
    const accessToken = LoginResponse.data["data"]["accessToken"];
    if (LoginResponse.status === 200) {
      const response = NextResponse.json({}, { status: 200 });
      response.cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        maxAge: data["autoLogin"] ? 60 * 60 * 24 * 30 : undefined,
      });
      response.cookies.set({
        name: "autoLogin",
        value: data["autoLogin"] ? "true" : "false",
        path: "/",
        httpOnly: true,
        maxAge: data["autoLogin"] ? 60 * 60 * 24 * 30 : undefined,
      });
      return response;
    }
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 400) {
      return NextResponse.json(
        {
          message: "Bad Request",
          code: 400,
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
