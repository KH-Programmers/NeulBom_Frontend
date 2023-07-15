"use client";

import React from "react";

import clsx from "clsx";

import { getAllergy } from "@/utils/types";

export const TodayMealPanel: React.FC<{
  meal: {
    date: number;
    lunchData: Array<[string, number[]]>;
    dinnerData: Array<[string, number[]]>;
  };
}> = ({ meal }) => {
  const [isLunch, setIsLunch] = React.useState(true);

  const allergies: number[][] = [[], []];

  meal.lunchData.map(([name, allergy]) => {
    allergy.map((allergy) => {
      allergies[0].push(allergy);
    });
  });
  meal.dinnerData.map(([name, allergy]) => {
    allergy.map((allergy) => {
      allergies[1].push(allergy);
    });
  });

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <button
          className={clsx(
            "flex-grow w-0 py-1 flex justify-center items-center rounded-md transition-all",
            {
              "hover:bg-black/5": !isLunch,
              "bg-primary text-white": isLunch,
            },
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
            },
          )}
          onClick={() => setIsLunch(false)}
        >
          석식
        </button>
      </div>
      <div className="mt-2">
        <ul className="list-disc list-inside opacity-60 font-extralight text-lg">
          {isLunch
            ? meal.lunchData.map(([name, allergy], k) => (
                <li key={k}>{name}</li>
              ))
            : meal.dinnerData.map(([name, allergy], k) => (
                <li key={k}>{name}</li>
              ))}
        </ul>
        <div className="opacity-40 mt-2">
          {meal.lunchData.length === 0
            ? ""
            : `알레르기 정보: ${getAllergy([
                ...new Set(allergies[isLunch ? 0 : 1]),
              ])}`}
        </div>
      </div>
    </div>
  );
};
