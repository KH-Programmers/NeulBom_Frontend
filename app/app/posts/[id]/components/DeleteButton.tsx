"use client";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { url } from "inspector";
import { AxiosError } from "axios";

import { DELETE } from "@/utils/request";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const DeleteButton: React.FC<{
  category: string;
  token: RequestCookie;
  url: string;
}> = ({ category, token, url }) => {
  const deletePost = async () => {
    try {
      const response = await DELETE(url, token.value); ///url은 후에 category 받아와서 수정.
      if (response.status === 204) {
        window.location.replace(`/app/board/${category}`);
        return alert("정상적으로 삭제되었습니다.");
      }
    } catch (e) {
      const error = e as AxiosError;
      switch (error.response?.status) {
        case 301:
          return alert("타인의 글이거나 글을 삭제할 수 있는 권한이 없습니다.");
      }
    }
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <button
      onClick={deletePost}
      className="text-center block px-4 py-2 rounded-lg transition-all border-red-500 hover:bg-red-500 border-2 text-red-500 hover:text-white"
    >
      삭제
    </button>
  );
};
