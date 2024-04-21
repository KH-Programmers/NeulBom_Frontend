"server-only";

import { GET } from "@/utils/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const LogoutButton: React.FC = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/signin");
  }

  const logout = () => {
    GET(`user/logout/`, token.value);
  };
  return (
    <button
      className="inline float-right text-slate-500 font-medium"
      onClick={() => {}}
    >
      로그아웃
    </button>
  );
};
