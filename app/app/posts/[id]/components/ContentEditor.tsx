"use client";

import React from 'react';
import Select from "react-select";
import MDEditor from "@uiw/react-md-editor/esm";
import { POST } from '@/utils/request';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { object } from 'yup';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const categories = [
  {
    label: "전체",
    value: "study",
  },
  /* 카테고리 추가할 것. */
];

const ConetentEditor:React.FC = () => {
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [showEditor, setShowEditor] = React.useState(false);
  const {push} = useRouter();

  React.useEffect(() => {
    setShowEditor(true);
  }, []);

  const articleSubmit = async() => {
    const data = {
      title : title,
      text : content,
    }
    try {
    const response = await POST(`/board/study/write/`, data);///url은 후에 category 받아와서 수정.
    if (response.status === 201) {
      push('/app/board/all');
    }
    } catch (e) {
      const error = e as AxiosError;
      switch (error.response?.status) {
        case 400 : return alert("카테고리를 선택하지 않았거나 글 형식이 잘못되었습니다."); 
      }
    }
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