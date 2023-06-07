import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import {
  TbCalendar,
  TbChevronRight,
  TbEye,
  TbHeart,
} from "react-icons/tb";
import { Comment } from "./components/Comment";
import { CommentInput } from "./components/CommentInput";
import { redirect } from 'next/navigation';
import { GET } from "@/utils/request";
import {Category, CommentElement} from "./types";
import { ShareButton } from './components/shareButton';
import { LikeButton } from './components/LikeButton';

export default async function PostViewPage({
  params,
}: {
  params: { id : string };
}) {

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let article;
  if (!token) {
    return redirect("/signin");
  }
  try{  
    const response = await GET(`/board/study/${params.id}`, token.value);
    article = response.data;
  } catch (e) {
    article = []
  }
  console.log(article);
  const comment = article.comments.map((comment:CommentElement, k:number) => (
    <Comment 
      key={k}
      nested={false}
      CommentElement={comment}
    />
  ))

  const BoardCategory = article.board_model.map((boardName:Category) => (
    <><Link href={`/app/board/${boardName.board_EN}`} className="text-blue-500">
      {boardName.board_name}
    </Link><TbChevronRight className="text-black/40" /></>
  ))

  const requestUrl = `/board/${article.board_model[0].board_EN}/${article.id}`;

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <article>
          <div className="flex gap-2 items-center">
            {BoardCategory}
          </div>
          <h1 className="text-4xl font-extrabold mt-2">{article.title}</h1>
          <hr className="border-t border-black/40 mt-2" />
          <div className="flex mt-2">
            <div className="text-gray-500">{article.authorName}</div>
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
            <div>
              {article.text}
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <LikeButton 
              likeCount={article.like_count}
              url={requestUrl}
              token = {token}
            />
            <div className="flex-grow w-0" />
            <ShareButton />
          </div>
        </article>
        <div className="mt-8">
          <div className="text-2xl font-bold">댓글</div>
          <div className="mt-4">
            <CommentInput />
          </div>
          <div className="mt-4 bg-white rounded-xl shadow-md divide-y">
            {comment}
          </div>
        </div>
        <div className="mt-16" />
      </div>
    </div>
  );
};

