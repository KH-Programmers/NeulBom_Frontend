"use client";

import clsx from "clsx";
import React from "react";
import { TbSend } from "react-icons/tb";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export const CommentInput: React.FC<{ nested?: boolean }> = ({ nested }) => {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? "")}
        previewOptions={{
          rehypePlugins: [rehypeSanitize],
        }}
        preview="edit"
      />
      <div className="flex mt-2">
        <div className="flex-grow"></div>
        <button
          onClick={() => {
            alert(value);
          }}
          className="bg-blue-500 text-white px-4 py-2 hover:brightness-90 active:brightness-75 transition-all rounded-lg flex gap-2 items-center"
        >
          <TbSend />
          등록하기
        </button>
      </div>
    </div>
  );
};
