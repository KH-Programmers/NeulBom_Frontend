import React from "react";
import { TbCheck, TbChecklist, TbPencil } from "react-icons/tb";

export const SignUpTaskList = () => {
  return (
    <div className="flex mt-4 w-full">
      <div className="relative flex flex-col items-center gap-2 flex-grow w-0">
        <div>
          <div
            className="h-[4px] bg-black/10 bg-black absolute left-1/2 top-[22px] ms-[24px]"
            style={{ width: "calc(100% - 48px)" }}
          />
          <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center">
            <TbChecklist size={24} color="white" />
          </div>
        </div>
        <div className="text-lg font-medium">약관 동의</div>
      </div>
      <div className="relative flex flex-col items-center gap-2 flex-grow w-0">
        <div
          className="w-full h-[4px] bg-black/10 bg-black absolute left-1/2 top-[22px] ms-[24px]"
          style={{ width: "calc(100% - 48px)" }}
        />
        <div className="bg-black/20 text-black/40 w-12 h-12 rounded-full flex justify-center items-center">
          <TbPencil size={24} />
        </div>
        <div className="text-lg font-medium opacity-60">회원 정보</div>
      </div>
      <div className="flex flex-col items-center gap-2 flex-grow w-0">
        <div className="bg-black/20 text-black/40 w-12 h-12 rounded-full flex justify-center items-center">
          <TbCheck size={24} />
        </div>
        <div className="text-lg font-medium opacity-60">가입 완료</div>
      </div>
    </div>
  );
};
