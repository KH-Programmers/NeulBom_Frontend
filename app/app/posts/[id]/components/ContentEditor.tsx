"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AxiosError } from "axios";
import MDEditor from "@uiw/react-md-editor";
import Select, { ActionMeta, SingleValue } from "react-select";

import { POST } from "@utils/request";
import { Checkbox } from "@components/Checkbox";

type Option = {
  label: string;
  value: string;
};

const ContentEditor: React.FC<{
  categories: { label: string; value: string }[];
  defaultCategory: { label: string; value: string } | null;
  isSuper: boolean;
  token: string;
}> = ({ categories, defaultCategory, isSuper, token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(
    defaultCategory?.value || "schoolLife",
  );
  const [visible, setVisible] = useState("");

  const articleSubmit = async () => {
    const data = {
      title: title,
      text: content,
      isAnonymous: visible === "anonymous",
      isAdmin: visible === "admin",
    };
    if (!category || !title || !content) {
      return alert("모든 항목을 입력해주세요.");
    }
    try {
      const response = await POST(`/board/${category}/write/`, data, token);
      if (response.status === 201) {
        alert("업로드 되었습니다.");
        window.location.href = `/app/board/${category}`;
        return;
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
      <div className="flex mt-2 gap-2">
        <div className="flex-grow" />

        <label className="flex gap-2 items-center font-bold">
          <Checkbox
            onChange={(e) => {
              setVisible(e.target.checked ? "anonymous" : "");
            }}
            checked={visible === "anonymous"}
          />
          익명 표시
        </label>

        {isSuper && (
          <label className="flex gap-2 items-center font-bold">
            <Checkbox
              onChange={(e) => {
                setVisible(e.target.checked ? "admin" : "");
              }}
              checked={visible === "admin"}
            />
            관리자 표시
          </label>
        )}

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
