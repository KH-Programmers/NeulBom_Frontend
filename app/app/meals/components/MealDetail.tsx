import React from "react";

import { format } from "date-fns";
import { TbThumbDown, TbThumbUp } from "react-icons/tb";

import { MealOfDate } from "../type";
import { Allergy } from "@/utils/types";

export const MealDetail: React.FC<{
  meal: MealOfDate;
  menuKey: "lunch" | "dinner";
}> = ({ meal, menuKey }) => {
  const menu = meal[menuKey];
  const allergy: number[] = [];
  menu.forEach((x) => {
    if (x.allergy) {
      allergy.push(...x.allergy);
    }
  });

  return (
    <div className="bg-white p-8 relative rounded-xl shadow flex flex-col overflow-hidden w-full h-full min-h-[180px]">
      <div className="flex w-full">
        <div className="flex items-center gap-2 divide-x-2 flex-grow w-0">
          <div className="text-2xl text-primary font-extrabold">
            오늘의 {menuKey === "lunch" ? "점심" : "저녁"}
          </div>
          <div className="pl-2 text-lg text-black/60 font-semibold">
            Today{"'"}s {menuKey === "lunch" ? "Lunch" : "Dinner"}
          </div>
        </div>
        <div className="text-lg text-black/40 font-semibold">
          {format(meal.date, "M/d")}
        </div>
      </div>
      <ul className="mt-2 list-disc list-inside">
        {menu.map((x, i) => (
          <li key={i} className="text-lg font-semibold text-black/60">
            {x.name}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <div className="text-primary font-light">알레르기 정보</div>
        <div className="font-semibold text-black/40">
          {Object.keys(Object.fromEntries(allergy.map((v) => [v, 0])))
            .map((x) => Allergy[Number(x) - 1])
            .join(", ")}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="p-1 gap-2 border-2 flex rounded-lg transition-all text-black/20 border-black/20 hover:bg-blue-500 hover:border-blue-500 hover:bg-transparent hover:text-blue-500">
          <TbThumbUp size={24} />
        </button>
        <button className="p-1 gap-2 border-2 text-black/20 border-black/20 flex rounded-lg transition-all hover:text-red-500 hover:border-red-500">
          <TbThumbDown size={24} />
        </button>
      </div>
    </div>
  );
};
