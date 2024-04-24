import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GET } from "@/utils/request";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  if (!token) {
    return redirect("/signin");
  } else {
    const response = await fetch(
      `${process.env.NEXT_API}/user/authentication`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token.value}`,
        },
      },
    );
    if (response!.status == 200) {
      return redirect("/app");
    } else {
      return redirect("/signin");
    }
  }
};

export default Page;
