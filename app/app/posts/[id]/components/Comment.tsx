"use client";

import clsx from "clsx";
import React from "react";
import {
  TbChevronUp,
  TbCornerDownRight,
  TbHeart,
  TbHeartFilled,
} from "react-icons/tb";
import { CommentInput } from "./CommentInput";
import { AnimatePresence, motion } from "framer-motion";
import {CommentElement} from "../types";
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface Comment {
  nested?: boolean, 
  CommentElement:CommentElement, 
  parentUrl:string,
  token:RequestCookie,
}
export const Comment: React.FC<Comment> = ({ 
  nested, 
  CommentElement,
  parentUrl,
  token,
}) => {
  const [like, setLike] = React.useState(false);
  const [repliesOpen, setRepliesOpen] = React.useState(false);
  const [replys, setReplys] = React.useState<CommentElement[]>(CommentElement.reply);

  const requestUrl = parentUrl;
  

  let comment;
  if (replys[0] != null) {
    comment = replys.map((reply:CommentElement, k:number) => (
      <Comment
      key={k}
      nested={true}
      CommentElement={reply}
      parentUrl={'null'}
      token={token}
      />
    ))
  }
  const replyCount = CommentElement.reply.length;
  const replySubmit = (comment:string) => {
    const newComment: CommentElement = {
      id: replys[replys.length-1].id + 1,
      author_name: CommentElement.author_name,
      content: comment,
      reply: [],
    };

    setReplys((prevComments) => [...prevComments, newComment]);
  }

  return (
    <div className="flex p-6 gap-4">
      <div
        className={clsx("bg-black/20 rounded-full flex-shrink-0", {
          "w-16 h-16": !nested,
          "w-14 h-14": nested,
        })}
      />
      <div>
        <div className={clsx("font-semibold", nested ? "text-lg" : "text-xl")}>
          익명{/*CommentElement.author_name 익명기능 추가*/}
        </div>
        <div
          className={clsx({
            "text-sm": nested,
          })}
        >
          {CommentElement.content}
        </div>
        <div className="flex mt-2 gap-4">
          {!nested && (
            <button
              className="flex gap-2 items-center"
              onClick={() => setRepliesOpen((v) => !v)}
            >
              {repliesOpen ? (
                <TbChevronUp size={22} />
              ) : (
                <TbCornerDownRight size={22} />
              )}
              답장({replyCount})
            </button>
          )}
          <button
            className={clsx("flex items-center", {
              "text-red-500": like,
              "text-sm gap-1": nested,
              "gap-2": !nested,
            })}
            onClick={() => setLike((v) => !v)}
          >
            {/*like ? (
              <TbHeartFilled size={nested ? 20 : 22} />
            ) : (
              <TbHeart size={nested ? 20 : 22} />
            )*/}
            {/*10*/}
          </button>
        </div>
        <AnimatePresence>
          {!nested && repliesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2">
                <CommentInput nested={true} url={requestUrl} token={token} parentCommentId={CommentElement.id} onCommentSubmit={replySubmit}/>
              </div>
              <div className="bg-black/5 rounded-xl mt-2 divide-y">
                {comment}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
