import React from "react";
import ContentEditor from "./[id]/components/ContentEditor";
import { cookies } from "next/headers";
import { redirect } from "next/dist/client/components/navigation";

const PostCreatePage: React.FC<{ searchParams: { category: string } }> = ({
  searchParams,
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/signin");
  }

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <div className="text-2xl font-bold">글쓰기</div>
        <ContentEditor defaultCategory={searchParams.category} token={token} />
      </div>
    </div>
  );
};

export default PostCreatePage;
