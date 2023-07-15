import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { TbCalendar, TbChevronRight, TbEye, TbHeart } from "react-icons/tb";
import { redirect } from "next/navigation";
import { GET } from "@/utils/request";
import { Category } from "./types";
import { ShareButton } from "./components/shareButton";
import { LikeButton } from "./components/LikeButton";
import { CommentList } from "./components/CommentList";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";
import { DeleteButton } from "./components/DeleteButton";

export default async function PostViewPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let article;
  let currentPostId = params.id;
  let isDelete = false;

  if (!token) {
    return redirect("/signin");
  }
  try {
    const response = await GET(`/board/study/${params.id}`, token.value);
    article = response.data;
    currentPostId = article.id;
  } catch (e) {
    article = [];
  }
  const requestUrl = `/board/${article.board_model[0].board_EN}/${article.id}/`;
  let authorName = "익명";
  if (article.user.isAdmin) {
    authorName = "관리자";
  } // 추후에 본인 글은 삭제할 수 있게 권한 추가
  if (article.canDelete) {
    isDelete = true;
  }
  const BoardCategory = article.board_model.map((boardName: Category) => (
    <>
      <Link href={`/app/board/${boardName.board_EN}`} className="text-blue-500">
        {boardName.board_name}
      </Link>
      <TbChevronRight className="text-black/40" />
    </>
  ));
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
              {authorName}
              {/*article.authorName 익명기능 추가*/}
            </div>
            <div className="flex-grow" />
            <div className="flex gap-4 items-center text-black/60">
              <div className="flex items-center gap-2">
                <TbEye size={20} />
                <span>{article.viewcounts}</span>
              </div>
              <div className="flex items-center gap-2">
                <TbHeart size={20} />
                <span>{article.like_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <TbCalendar size={20} />
                <span>{article.updated_at}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 mt-4 rounded-xl shadow-md">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
          <div className="mt-4 flex gap-4">
            <LikeButton
              likeCount={article.like_count}
              url={requestUrl}
              token={token}
              isLiked={article.IsLiked}
            />
            <div className="flex-grow w-0" />
            <ShareButton />
            {isDelete && <DeleteButton id={currentPostId} token={token} />}
          </div>
        </article>
        <CommentList article={article} requestUrl={requestUrl} token={token} />
        <div className="mt-16" />
      </div>
    </div>
  );
}
