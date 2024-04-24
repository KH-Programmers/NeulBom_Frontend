import { NextRequest, NextResponse } from "next/server";

import axios, { AxiosError } from "axios";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  if (!request.cookies.has("accessToken")) {
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
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URI! + params.get("path"),
      {
        headers: {
          Authorization: `Token ${request.cookies.get("accessToken")?.value}`,
        },
      },
    );
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (e) {
    const error = e as AxiosError;
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}

export async function POST(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  if (!request.cookies.has("token")) {
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
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URI! + params.get("path"),
      await request.json(),
      {
        headers: {
          Authorization: `Token ${request.cookies.get("token")?.value}`,
        },
      },
    );
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (e) {
    const error = e as AxiosError;
    return NextResponse.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
