import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page: React.FC = () => {
  const cookieStore = cookies();

  if (!cookieStore.has("token")) {
    return redirect("/signin");
  } else {
    return redirect("/app");
  }
};

export default Page;
