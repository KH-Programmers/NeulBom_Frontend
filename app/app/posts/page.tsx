"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor/esm";
import Select from "react-select";

const categories = [
  {
    label: "wow",
    value: 1,
  },
  {
    label: "sans",
    value: 2,
  },
  {
    label: "hello",
    value: 3,
  },
  {
    label: "world",
    value: 4,
  },
];

const PostCreatePage: React.FC = () => {
  const [content, setContent] = React.useState("");
  const [showEditor, setShowEditor] = React.useState(false);

  React.useEffect(() => {
    setShowEditor(true);
  }, []);

  return (
    <div className="px-6">
      <div className="max-w-[768px] mx-auto mt-12">
        <div className="text-2xl font-bold">글쓰기</div>
        <div className="w-full flex gap-2 mt-2">
          <div>
            <Select className="w-[180px]" options={categories} />
          </div>
          {/* <input
            type="text"
            placeholder="카테고리"
            className="w-1/3 mt-2 p-2 outline-none rounded-lg shadow placeholder:text-black/40 transition-all"
          /> */}
          <input
            type="text"
            placeholder="제목"
            className="w-full p-2 outline-none rounded-lg shadow placeholder:text-black/40"
          />
        </div>
        {showEditor && (
          <MDEditor
            value={content}
            onChange={(value) => setContent(value ?? "")}
            className="mt-2"
            height={480}
          />
        )}
        <div className="flex mt-2">
          <div className="flex-grow" />

          <button className="px-8 py-2 bg-primary rounded-lg shadow text-white">
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreatePage;
