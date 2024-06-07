"use client";

import React from "react";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { TbSend, TbCornerDownRight, TbChevronUp } from "react-icons/tb";

import { POST } from "@utils/request";
import type { Comment } from "../types";

const CommentInputBox: React.FC<{
  url: string;
  token: string;
  parentCommentId: number;
  onCommentSubmit: (comment: string) => void;
}> = ({ url, token, parentCommentId, onCommentSubmit }) => {
  const [textareaValue, setTextareaValue] = React.useState("");

  const upload = async () => {
    let parentComment;
    if (!false) {
      parentComment = null;
    } else {
      parentComment = parentCommentId;
    }
    await POST(
      url,
      { content: textareaValue, parent_comment: parentComment },
      token,
    );
    onCommentSubmit(textareaValue);
    setTextareaValue("");
  };

  return (
    <div>
      <textarea
        id="commentInput"
        rows={4}
        className={clsx(
          "bg-black/5 w-full resize-none rounded-xl focus:outline-none p-4",
          {
            "text-sm": false,
          },
        )}
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
      <div className="flex mt-2">
        <div className="flex-grow"></div>
        <button
          onClick={upload}
          className={clsx(
            "bg-blue-500 text-white px-4 py-2 hover:brightness-90 active:brightness-75 transition-all rounded-lg flex gap-2 items-center",
            {
              "text-sm": false,
            },
          )}
        >
          <TbSend size={false ? 14 : 16} />
          등록하기
        </button>
      </div>
    </div>
  );
};

export const CommentList: React.FC<{
  comments: Comment[];
}> = ({ comments }) => {
  const [commentList, setCommentList] = React.useState<Comment[]>(comments);
  const [textareaValue, setTextareaValue] = React.useState("");

  return (
    <div className="mt-8">
      <div className="text-2xl font-bold">댓글({commentList.length})</div>
      <div className="mt-4">
        <div>
          <textarea
            id="commentInput"
            rows={4}
            className={clsx(
              "bg-black/5 w-full resize-none rounded-xl focus:outline-none p-4",
              {
                "text-sm": false,
              },
            )}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          ></textarea>
          <div className="flex mt-2">
            <div className="flex-grow"></div>
            <button
              onClick={() => {}}
              className={clsx(
                "bg-blue-500 text-white px-4 py-2 hover:brightness-90 active:brightness-75 transition-all rounded-lg flex gap-2 items-center",
                {
                  "text-sm": false,
                },
              )}
            >
              <TbSend size={false ? 14 : 16} />
              등록하기
            </button>
          </div>
        </div>
      </div>
      <div id="comment" className="mt-4 bg-white rounded-xl shadow-md divide-y">
        <div className="flex p-6 gap-4">
          <div
            className={clsx("bg-black/20 rounded-full flex-shrink-0", {
              "w-16 h-16": !false,
              "w-14 h-14": false,
            })}
          />
          <div>
            <div
              className={clsx("font-semibold", false ? "text-lg" : "text-xl")}
            >
              익명
            </div>
            <div
              className={clsx({
                "text-sm": false,
              })}
            >
              ㅋㅋ
            </div>
            <div className="flex mt-2 gap-4">
              {!false && (
                <button
                  className="flex gap-2 items-center"
                  onClick={() => {
                    // setRepliesOpen((v) => !v)
                  }}
                >
                  {false ? (
                    <TbChevronUp size={22} />
                  ) : (
                    <TbCornerDownRight size={22} />
                  )}
                  답장
                  {/* ({replys.length}) */}
                </button>
              )}
              <button
                className={clsx("flex items-center", {
                  "text-red-500": true,
                  "text-sm gap-1": false,
                  "gap-2": !false,
                })}
                onClick={() => {
                  // setLike((v) => !v)
                }}
              >
                {/*like ? (
              <TbHeartFilled size={false ? 20 : 22} />
            ) : (
              <TbHeart size={false ? 20 : 22} />
            )*/}
                {/*10*/}
              </button>
            </div>
            <AnimatePresence>
              {!false && false && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    <CommentInputBox
                      url={""}
                      token={""}
                      parentCommentId={0}
                      onCommentSubmit={() => {}}
                    />
                  </div>
                  <div className="bg-black/5 rounded-xl mt-2 divide-y">
                    ㅋㅋ
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
