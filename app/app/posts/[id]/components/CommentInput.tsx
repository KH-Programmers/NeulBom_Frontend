import clsx from "clsx";
import React from "react";
import { TbSend } from "react-icons/tb";

export const CommentInput: React.FC<{ nested?: boolean }> = ({ nested }) => {
  return (
    <div>
      <textarea
        rows={4}
        className={clsx(
          "w-full resize-none focus:outline-none bg-black/5 rounded-xl p-4",
          nested ? "text-sm" : "text-base"
        )}
      ></textarea>
      <div className="flex mt-2">
        <div className="flex-grow"></div>
        <button className="bg-blue-500 text-white px-4 py-2 hover:brightness-90 active:brightness-75 transition-all rounded-lg flex gap-2 items-center">
          <TbSend />
          등록하기
        </button>
      </div>
    </div>
  );
};
