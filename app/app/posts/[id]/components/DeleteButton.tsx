"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { AxiosError } from "axios";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { DELETE } from "@utils/request";

export const DeleteButton: React.FC<{
  category: string[];
  id: string;
  token: RequestCookie;
}> = ({ category, id, token }) => {
  const router = useRouter();
  const deletePost = async () => {
    try {
      const response = await DELETE(`/board/article/${id}`, token.value);
      if (response.status === 204) {
        alert("정상적으로 삭제되었습니다.");
        window.location.href = `/app/board/${category[0]}`;
        return;
      }
    } catch (e) {
      const error = e as AxiosError;
      switch (error.response?.status) {
        case 301:
          return alert("타인의 글이거나 글을 삭제할 수 있는 권한이 없습니다.");
      }
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-center block px-4 py-2 rounded-lg transition-all border-red-500 hover:bg-red-500 border-2 text-red-500 hover:text-white"
      >
        삭제
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-center text-xl font-bold leading-6 text-gray-900"
                  >
                    ⚠️ Warning
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                      정말로 삭제하시겠습니까?
                    </p>
                  </div>

                  <div className="mt-4 w-full flex justify-center gap-4">
                    <button
                      type="button"
                      className="w-1/3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deletePost}
                    >
                      동의
                    </button>
                    <button
                      type="button"
                      className="w-1/3 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      취소
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
