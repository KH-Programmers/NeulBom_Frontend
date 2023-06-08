"use client";

import clsx from "clsx";
import React from "react";
import { TbSend } from "react-icons/tb";
import { POST } from "@/utils/request";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CommentElement } from '../types';

interface CommentEl {
  nested?: boolean; 
  url:string; 
  token:RequestCookie;
  parentCommentId: number;
}

export const CommentInput: React.FC<CommentEl> = ({ nested, url, token, parentCommentId}) => {

  const upload = async() => {
    const comment = document.getElementById("commentInput") as HTMLTextAreaElement;
    let parentComment;
    if (nested) {
      parentComment = null
    } else {
      parentComment = parentCommentId
    } 
    console.log(comment.value);
    await POST(url, {content: comment.value, parent_comment:parentComment}, token.value);
  }

  return (
    <div>
      <textarea
        id="commentInput"
        rows={4}
        className={clsx(
          "bg-black/5 w-full resize-none rounded-xl focus:outline-none p-4",
          {
            "text-sm": nested,
          }
        )}
      ></textarea>
      <div className="flex mt-2">
        <div className="flex-grow"></div>
        <button
          onClick={upload}
          className={clsx(
            "bg-blue-500 text-white px-4 py-2 hover:brightness-90 active:brightness-75 transition-all rounded-lg flex gap-2 items-center",
            {
              "text-sm": nested,
            }
          )}
        >
          <TbSend size={nested ? 14 : 16} />
          등록하기
        </button>
      </div>
    </div>
  );
};
