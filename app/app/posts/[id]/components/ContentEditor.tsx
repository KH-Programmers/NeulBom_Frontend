"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import MDEditor from "@uiw/react-md-editor";
import Select, { ActionMeta, SingleValue } from "react-select";

import { POST } from "@utils/request";

type Option = {
  label: string;
  value: string;
};

const ContentEditor: React.FC<{
  categories: { label: string; value: string }[];
  defaultCategory: { label: string; value: string } | null;
  token: string;
}> = ({ categories, defaultCategory, token }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("study");

  const { push } = useRouter();

  const articleSubmit = async () => {
    const data = {
      title: title,
      text: content,
    };
    try {
      const response = await POST(`/board/${category}/write/`, data, token);
      if (response.status === 201) {
        push(`/app/board/${category}`);
        return alert("업로드 되었습니다.");
      }
    } catch (e) {
      const error = e as AxiosError;
      switch (error.response?.status) {
        case 400:
          return alert(
            "카테고리를 선택하지 않았거나 글 형식이 잘못되었습니다.",
          );
      }
    }
  };

  const categorySubmit = (
    newValue: SingleValue<Option> | null,
    actionMeta: ActionMeta<Option>,
  ) => {
    setCategory(newValue ? newValue.value : "schoolLife");
  };

  return (
    <>
      <div className="w-full flex items-center gap-2 mt-2">
        <div>
          <Select
            className="w-[180px]"
            options={categories}
            onChange={categorySubmit}
            defaultValue={defaultCategory}
            placeholder="카테고리"
          />
        </div>
        <input
          type="text"
          placeholder="제목"
          className="w-full p-2 outline-none rounded-lg shadow placeholder:text-black/40"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <MDEditor
        value={content}
        onChange={(value) => setContent(value ?? "")}
        className="mt-2"
        height={480}
      />
      <div className="flex mt-2">
        <div className="flex-grow" />

        <button
          className="px-8 py-2 bg-primary rounded-lg shadow text-white"
          onClick={articleSubmit}
        >
          등록
        </button>
      </div>
    </>
  );
};

export default ContentEditor;
