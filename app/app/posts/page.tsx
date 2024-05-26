import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GET } from "@utils/request";
import ContentEditor from "./[id]/components/ContentEditor";
import { BoardCategory } from "@/app/app/board/types";

const PostCreatePage: React.FC<{
  searchParams: { category: string };
}> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    redirect("/signin");
  }

  let categories: {
    label: string;
    value: string;
  }[] = [];

  let defaultValue: {
    label: string;
    value: string;
  } | null = null;

  try {
    const response = await GET("/board/");
    const data = response!.data as BoardCategory[];
    data.map((category) => {
      if (category.children) {
        category.children.map((child) => {
          if (child.isWritable) {
            if (child.id === searchParams.category) {
              defaultValue = {
                label: child.name,
                value: child.id,
              };
            }
            categories.push({
              label: child.name,
              value: child.id,
            });
          }
        });
      } else {
        if (category.isWritable) {
          if (category.id === searchParams.category) {
            defaultValue = {
              label: category.name,
              value: category.id,
            };
          }
          categories.push({
            label: category.name,
            value: category.id,
          });
        }
      }
    });
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <div className="text-2xl font-bold">글쓰기</div>
        <ContentEditor
          categories={categories}
          defaultCategory={defaultValue}
          token={token.value}
        />
      </div>
    </div>
  );
};

export default PostCreatePage;
