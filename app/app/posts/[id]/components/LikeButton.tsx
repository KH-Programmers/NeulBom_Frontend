"use client";
import React from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { PUT, DELETE } from "@utils/request";

import { TbHeart, TbHeartFilled } from "react-icons/tb";

export const LikeButton: React.FC<{
  likeCount: number;
  id: string;
  token: RequestCookie;
  isLiked: Boolean;
}> = ({ likeCount, id, token, isLiked }) => {
  const [count, setCount] = React.useState(likeCount);
  const [isCounted, setIsCounted] = React.useState(isLiked);

  const handleLike = async () => {
    if (isCounted) {
      setCount(count - 1);
      setIsCounted(false);
      await DELETE(`/board/article/${id}/like`, token.value);
    } else {
      setCount(count + 1);
      setIsCounted(true);
      await PUT(`/board/article/${id}/like`, token.value);
    }
  };

  return (
    <button
      className="border-2 p-2 border-red-500 text-red-500 rounded-lg flex gap-2 items-center hover:bg-red-500 hover:text-white transition-all"
      onClick={handleLike}
    >
      {isCounted ? <TbHeartFilled size={20} /> : <TbHeart size={20} />}
      <div className="text-sm">{count}</div>
    </button>
  );
};
