"use client";

import clsx from "clsx";
import React from "react";
import {
  TbChevronUp,
  TbCornerDownRight,
  TbHeart,
  TbHeartFilled,
} from "react-icons/tb";

export const Comment: React.FC<{ nested?: boolean }> = ({ nested }) => {
  const [like, setLike] = React.useState(false);
  const [repliesOpen, setRepliesOpen] = React.useState(false);

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
          Username
        </div>
        <div
          className={clsx({
            "text-sm": nested,
          })}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          minima cupiditate placeat tempore a, possimus eum dolor eius nemo vel
          consequatur eligendi doloremque quidem accusantium hic qui quaerat
          veniam nihil?
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
              답장
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
            {like ? (
              <TbHeartFilled size={nested ? 20 : 22} />
            ) : (
              <TbHeart size={nested ? 20 : 22} />
            )}
            10
          </button>
        </div>
        {!nested && repliesOpen && (
          <div className="bg-black/5 rounded-xl mt-2 divide-y">
            <Comment nested />
            <Comment nested />
            <Comment nested />
          </div>
        )}
      </div>
    </div>
  );
};
