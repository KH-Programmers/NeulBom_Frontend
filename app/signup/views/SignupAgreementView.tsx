import React from "react";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";

export const SignupAgreementView: React.FC = () => {
  return (
    <form
      className="block w-full mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("submit");
      }}
    >
      <div className="p-4 border-2 rounded-xl border-black max-h-[240px] overflow-y-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        assumenda consequuntur deserunt dignissimos, eius est ex excepturi fugit
        libero modi nesciunt, nostrum officia possimus quia recusandae
        reiciendis tempore ut, voluptatibus. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Aliquid consectetur deleniti distinctio
        doloribus earum enim ex expedita iure laboriosam magni minima non
        perspiciatis praesentium quae, repudiandae totam vero, voluptas? Nulla?
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        maiores neque quis. Asperiores beatae est expedita nihil nisi qui sequi
        tempore ullam. Accusamus at error explicabo natus qui quia voluptatem.
      </div>
      <label className="flex gap-2 font-bold items-center mt-2">
        <Checkbox required />
        이용약관에 동의합니다
      </label>
      <div className="p-4 border-2 rounded-xl border-black mt-4 max-h-[240px] overflow-y-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        assumenda consequuntur deserunt dignissimos, eius est ex excepturi fugit
        libero modi nesciunt, nostrum officia possimus quia recusandae
        reiciendis tempore ut, voluptatibus.
      </div>
      <label className="flex gap-2 font-bold items-center mt-2">
        <Checkbox required />
        개인정보 수집 및 이용에 대해 동의합니다
      </label>
      <Button type="submit" className="mt-4">
        다음
      </Button>
    </form>
  );
};
