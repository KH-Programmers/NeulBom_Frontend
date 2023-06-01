"use client";

import clsx from "clsx";
import React from "react";
import { TbSend } from "react-icons/tb";

export const CommentInput: React.FC<{ nested?: boolean }> = ({ nested }) => {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <textarea
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
          onClick={() => {
            alert(value);
          }}
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
