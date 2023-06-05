import { NextResponse } from "next/server";

import axios, { AxiosError } from "axios";

export async function POST(request: Request) {
  const requestData = await request.json();
  const autoLogin = requestData["autoLogin"];
  delete requestData["autoLogin"];
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
        maxAge: autoLogin ? 60 * 60 * 24 * 7 : undefined,
      });
      response.cookies.set({
        name: "autoLogin",
        value: autoLogin ? "true" : "false",
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
