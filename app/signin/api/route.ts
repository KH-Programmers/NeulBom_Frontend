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
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "Unauthorized",
        code: 401,
      },
      {
        status: 200,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI!}/user/login/`,
      requestData
    );
    const token = response.data.token;
    if (response.status === 200) {
      const response = NextResponse.json({}, { status: 200 });
      response.cookies.set("token", token, {
        path: "/",
        httpOnly: true,
        maxAge: requestData["autoLogin"] ? 60 * 60 * 24 * 7 : undefined,
      });
      response.cookies.set({
        name: "autoLogin",
        value: requestData["autoLogin"] ? "true" : "false",
        path: "/",
        httpOnly: true,
      });
      return response;
    }
  } catch (e) {
    const error = e as AxiosError;
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}