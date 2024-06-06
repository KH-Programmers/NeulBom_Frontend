import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import { Article } from "./types";
import { GET } from "@utils/request";
import { LikeButton } from "./components/LikeButton";
import { ShareButton } from "./components/shareButton";
import { CommentList } from "./components/CommentList";
import { DeleteButton } from "./components/DeleteButton";

import html from "remark-html";
import { remark } from "remark";
import matter from "gray-matter";
import { TbCalendar, TbChevronRight, TbEye, TbHeart } from "react-icons/tb";

export default async function PostViewPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  let article: Article | null;
  try {
    const response = await GET(`/board/article/${params.id}`, token?.value);
    article = response!.data;
  } catch (e) {
    article = null;
  }
  if (!article) {
    return (
      <div className="flex items-center mx-auto">
        게시글이 존재하지 않습니다.
      </div>
    );
  }
  const BoardCategory = article.categories.map(
    (category: string, k: number) => (
      <div className="flex items-center" key={k}>
        <Link href={`/app/board/all`} className="text-blue-500">
          {category}
        </Link>
        <TbChevronRight className="text-black/40" />
      </div>
    ),
  );
  const matterResult = matter(article.text).content;
  const processedContent = await remark().use(html).process(matterResult);
  const contentHtml = processedContent.toString();

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <article>
          <div className="flex gap-2 items-center">{BoardCategory}</div>
          <h1 className="text-4xl font-extrabold mt-2">{article.title}</h1>
          <hr className="border-t border-black/40 mt-2" />
          <div className="flex mt-2">
            <div className="text-gray-500">
              {article.isAdmin
                ? "관리자"
                : article.isAnonymous
                  ? "익명"
                  : article.user.authorName}
            </div>
            <div className="flex-grow" />
            <div className="flex gap-4 items-center text-black/60">
              <div className="flex items-center gap-2">
                <TbEye size={20} />
                <span>{article.viewCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <TbHeart size={20} />
                <span>{article.likeCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <TbCalendar size={20} />
                <span>{article.updatedAt}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 mt-4 rounded-xl shadow-md">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
          <div className="mt-4 flex gap-4">
            <LikeButton
              likeCount={article.likeCount}
              id={article.id}
              token={token!}
              isLiked={article.user.isLiked}
            />
            <div className="flex-grow w-0" />
            <ShareButton />
            {article.canDelete && (
              <DeleteButton
                category={article.categories[article.categories.length - 1]}
                id={article.id}
                token={token!}
              />
            )}
          </div>
        </article>
        {/*<CommentList article={article} requestUrl={"/"} token={token!} />*/}
      </div>
    </div>
  );
}
