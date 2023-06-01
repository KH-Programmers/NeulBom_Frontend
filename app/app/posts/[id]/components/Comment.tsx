"use client";

import clsx from "clsx";
import React from "react";
import {
  TbChevronUp,
  TbCornerDownRight,
  TbHeart,
  TbHeartFilled,
} from "react-icons/tb";

export const Comment: React.FC = () => {
  const [like, setLike] = React.useState(false);
  const [repliesOpen, setRepliesOpen] = React.useState(false);

  return (
    <div className="flex p-6 gap-4">
      <div className="w-16 h-16 bg-black/20 rounded-full flex-shrink-0" />
      <div>
        <div className="text-xl font-semibold">Username</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          minima cupiditate placeat tempore a, possimus eum dolor eius nemo vel
          consequatur eligendi doloremque quidem accusantium hic qui quaerat
          veniam nihil?
        </div>
        <div className="flex mt-2 gap-4">
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
          <button
            className={clsx("flex gap-2 items-center", {
              "text-red-500": like,
            })}
            onClick={() => setLike((v) => !v)}
          >
            {like ? <TbHeartFilled size={22} /> : <TbHeart size={22} />}
            10
          </button>
        </div>
      </div>
    </div>
  );
};
