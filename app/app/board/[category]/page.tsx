import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { format } from "date-fns";

import { GET } from "@/utils/request";
import { PostListItem } from "./components/PostListItem";
import { Article } from "@/app/app/posts/[id]/types";

export default async function BoardCategoryView({
  params,
}: {
  params: { category: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")!;
  let articles: Article[] = [];
  try {
    const response = await GET(`/board/${params.category}`, token.value);
    articles = await response!.data;
  } catch (e) {
    articles = [];
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {articles.length ? (
        articles.map((article: Article, k) => (
          <PostListItem
            key={k}
            id={article.id}
            title={article.title}
            authorName={
              article.isAdmin
                ? "관리자"
                : article.isAnonymous
                  ? "익명"
                  : article.user.authorName
            }
            commentCount={article.comments.length}
            viewCount={article.viewCount}
            createdAt={format(new Date(article.updatedAt), "yyyy-MM-dd")}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
