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
  parentCommentId: number;
  onCommentSubmit: (comment:string) => void;
}

export const CommentInput: React.FC<CommentEl> = ({ nested, url, parentCommentId, onCommentSubmit}) => {
  const [textareaValue, setTextareaValue] = React.useState("");
  
  const upload = async() => {
    let parentComment
    if (!nested) {
      parentComment = null
    } else {
      parentComment = parentCommentId
    }
    await POST(url, {content:textareaValue, parent_comment:parentComment});
    onCommentSubmit(textareaValue);
    setTextareaValue("");
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
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
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
