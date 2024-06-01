"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  if (accessToken !== undefined && refreshToken !== undefined) {
    return redirect("/app");
  }
  return redirect("/signin");
};

export default Page;
