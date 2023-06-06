"use client";

import React from "react";
import clsx from "clsx";

export const TodayMealPanel: React.FC = () => {
  const [isLunch, setIsLunch] = React.useState(true);

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <button
          className={clsx(
            "flex-grow w-0 py-1 flex justify-center items-center rounded-md transition-all",
            {
              "hover:bg-black/5": !isLunch,
              "bg-primary text-white": isLunch,
            }
          )}
          onClick={() => setIsLunch(true)}
        >
          중식
        </button>
        <button
          className={clsx(
            "flex-grow w-0 py-1 flex justify-center items-center rounded-md transition-all",
            {
              "hover:bg-black/5": isLunch,
              "bg-primary text-white": !isLunch,
            }
          )}
          onClick={() => setIsLunch(false)}
        >
          석식
        </button>
      </div>
      <div className="mt-2">
        <ul className="list-disc list-inside opacity-60 font-extralight text-lg">
          <li>밥</li>
          <li>밥</li>
          <li>밥</li>
          <li>밥</li>
          <li>밥</li>
          <li>밥</li>
        </ul>
        <div className="opacity-40 mt-2">
          알레르기 정보: asdfasfdasdfasdfasfdasfasdf
        </div>
      </div>
    </div>
  );
};
