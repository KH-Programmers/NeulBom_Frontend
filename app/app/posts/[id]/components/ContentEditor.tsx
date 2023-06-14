"use client";

import React from 'react';
import Select from "react-select";
import MDEditor from "@uiw/react-md-editor/esm";
import { POST } from '@/utils/request';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { object } from 'yup';


const categories = [
  {
    label: "전체",
    value: "study",
  },
  /* 카테고리 추가할 것. */
];

interface token {
  token:RequestCookie;
}

const ConetentEditor:React.FC<token> = ({token}) => {
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [showEditor, setShowEditor] = React.useState(false);
  
  React.useEffect(() => {
    setShowEditor(true);
  }, []);

  const articleSubmit = async() => {
    const data = {
      title : "제목",
      text : content,
    }
    POST(`/board/study/write/`, data, token.value)///url은 후에 category 받아와서 수정.
  }

  return (
    <>
      <div className="w-full flex gap-2 mt-2">
        <div>
          <Select className="w-[180px]" options={categories}/>
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
          onChange={(e) => {setTitle(e.target.value)}}
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

        <button className="px-8 py-2 bg-primary rounded-lg shadow text-white" onClick={articleSubmit}>
          등록
        </button>
      </div>
    </>
  );
};

export default ConetentEditor