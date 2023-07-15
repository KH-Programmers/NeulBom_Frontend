"use client";

import { DELETE } from "@/utils/request";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { AxiosError } from "axios";

export const DeleteButton: React.FC<{ id: string; token: RequestCookie }> = ({
  id,
  token,
}) => {
  const deletePost = async () => {
    try {
      const response = await DELETE(`/board/study/${id}/`, token.value); ///url은 후에 category 받아와서 수정.
      if (response.status === 204) {
        window.location.replace("/app/board/all");
      }
    } catch (e) {
      const error = e as AxiosError;
      switch (error.response?.status) {
        case 301:
          return alert("타인의 글이거나 글을 삭제할 수 있는 권한이 없습니다.");
      }
    }
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
