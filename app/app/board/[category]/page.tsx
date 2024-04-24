import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { format } from "date-fns";

import { Post } from "../types";
import { GET } from "@/utils/request";
import { PostListItem } from "./components/PostListItem";

export default async function BoardCategoryView({
  params,
}: {
  params: { category: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  if (!token) {
    return redirect("/signin");
  }
  let posts: Post[] = [];
  try {
    const response = await GET(`/board/${params.category}`, token.value);
    posts = response!.data;
  } catch (e) {
    posts = [];
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post: Post, k) => (
        <PostListItem
          key={k}
          id={post.id}
          title={post.title}
          user={post.user}
          commentCount={post.commentCount}
          viewCount={post.viewCounts}
          createdAt={format(new Date(post.updatedAt), "yyyy-MM-dd")}
        />
      ))}
    </div>
  );
}
