"use client";

import React from "react";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbSend,
  TbCornerDownRight,
  TbChevronUp,
  TbUser,
  TbX,
} from "react-icons/tb";

import { DELETE, POST } from "@utils/request";
import type { Comment } from "../types";
import { Checkbox } from "@components/Checkbox";

const CommentInputBox: React.FC<{
  isSuper: boolean;
  token: string;
  articleId: string;
  parentCommentId?: string;
}> = ({ isSuper, token, articleId, parentCommentId }) => {
  const [textareaValue, setTextareaValue] = React.useState("");
  const [visible, setVisible] = React.useState("");

  const router = useRouter();

  return (
    <div>
      <textarea
        id="commentInput"
        rows={4}
        className="bg-black/5 w-full resize-none rounded-xl focus:outline-none p-4"
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
      <div className="flex mt-2 gap-2">
        <div className="flex-grow"></div>
        <label className="flex gap-2 items-center font-bold">
          <Checkbox
            onChange={(e) => {
              setVisible(e.target.checked ? "anonymous" : "");
            }}
            checked={visible === "anonymous"}
          />
          익명 표시
        </label>
        {isSuper && (
          <label className="flex gap-2 items-center font-bold">
            <Checkbox
              onChange={(e) => {
                setVisible(e.target.checked ? "admin" : "");
              }}
              checked={visible === "admin"}
            />
            관리자 표시
          </label>
        )}
        <button
          onClick={async () => {
            await POST(
              `/board/article/${articleId}/comments`,
              {
                text: textareaValue,
                parentCommentId: parentCommentId ? parentCommentId : null,
                isAnonymous: visible === "anonymous",
                isAdmin: visible === "admin",
              },
              token,
            );
            setTextareaValue("");
            router.refresh();
          }}
          className={clsx(
            "bg-blue-500 text-white px-4 py-2 hover:brightness-110 active:brightness-75 transition duration-100 rounded-lg flex gap-2 items-center",
          )}
        >
          <TbSend size={16} />
          등록하기
        </button>
      </div>
    </div>
  );
};

const CommentBox: React.FC<{
  comment: Comment;
  isReplied: boolean;
  isSuper: boolean;
  token: string;
  articleId: string;
  canDelete: boolean;
  parentCommentId?: string;
}> = ({
  comment,
  isReplied,
  isSuper,
  token,
  articleId,
  canDelete,
  parentCommentId,
}) => {
  const [repliesOpen, setRepliesOpen] = React.useState(false);

  const router = useRouter();

  return (
    <div className="flex p-6 gap-4">
      <TbUser
        className={clsx("rounded-full flex-shrink-0", {
          "w-14 h-14": !isReplied,
          "w-12 h-12": isReplied,
        })}
      />
      <div>
        <div className="font-semibold text-xl">
          {comment.isAdmin
            ? "관리자"
            : comment.isAnonymous
              ? "익명"
              : comment.authorName}
        </div>
        <div>{comment.content}</div>
        {!isReplied && (
          <>
            <div className="flex mt-2 gap-4">
              <button
                className="flex gap-2 items-center"
                onClick={() => {
                  setRepliesOpen(!repliesOpen);
                }}
              >
                <TbCornerDownRight size={22} />
                답장 ({comment.children.length})
              </button>
            </div>
            <AnimatePresence>
              {repliesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    <CommentInputBox
                      isSuper={isSuper}
                      token={token}
                      articleId={articleId}
                      parentCommentId={comment.id}
                    />
                  </div>
                  {comment.children.map((reply, j) => (
                    <CommentBox
                      key={j}
                      comment={reply}
                      isReplied={true}
                      isSuper={isSuper}
                      token={token}
                      articleId={articleId}
                      canDelete={reply.canDelete}
                      parentCommentId={comment.id}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {canDelete && (
          <button
            className="mt-2 flex flex-shrink-0 text-white items-center px-2 py-1 bg-red-500 rounded-lg"
            onClick={async () => {
              await DELETE(
                `/board/article/${articleId}/comments/${comment.id}`,
                token,
              );
              router.refresh();
            }}
          >
            <TbX className="flex-shrink-0 w-6 h-6" />
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export const CommentList: React.FC<{
  comments: Comment[];
  isSuper: boolean;
  token: string;
  articleId: string;
}> = ({ comments, isSuper, token, articleId }) => {
  let commentCount = comments.length;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].children) {
      commentCount += comments[i].children.length;
    }
  }

  return (
    <div className="my-8">
      <div className="text-2xl font-bold">댓글({commentCount})</div>
      <div className="mt-4">
        <CommentInputBox
          isSuper={isSuper}
          token={token}
          articleId={articleId}
        />
      </div>
      <div
        id="comment"
        className="mt-4 bg-white rounded-xl shadow-md divide-y divide-gray-200"
      >
        {comments.map((comment, i) => (
          <CommentBox
            key={i}
            comment={comment}
            isReplied={false}
            isSuper={isSuper}
            token={token}
            articleId={articleId}
            canDelete={comment.canDelete}
          />
        ))}
      </div>
    </div>
  );
};
