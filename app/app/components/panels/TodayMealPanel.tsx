"use client";

import React from "react";

import { getAllergy } from "@utils/types";

const Menu: React.FC<{
  name: string;
  allergies: number[];
}> = ({ name, allergies }) => {
  return (
    <div className="w-full h-full bg-gray-300 p-6 rounded-xl drop-shadow">
      <h1 className="font-bold">{name}</h1>
      <h2 className="text-sm font-light">{getAllergy(allergies)}</h2>
    </div>
  );
};

const MealPanel: React.FC<{
  isLunch?: boolean;
  mealData?: {
    isLunch: boolean;
    date: string;
    menu: Array<{
      name: string;
      allergies: Array<number>;
    }>;
  };
}> = ({ isLunch, mealData }) => {
  return (
    <div className="h-1/2">
      <div className="w-full py-1 flex justify-center items-center rounded-md bg-primary text-white">
        {isLunch ? "중식" : "석식"}
      </div>
      <div className="mt-2">
        <ul className="w-full h-1/2 grid-cols-2 grid gap-2 text-lg p-2">
          {mealData &&
            mealData.menu.map((menu, k) => (
              <Menu key={k} name={menu.name} allergies={menu.allergies} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export const TodayMealPanel: React.FC<{
  meal: {
    lunchData?: {
      isLunch: boolean;
      date: string;
      menu: Array<{
        name: string;
        allergies: Array<number>;
      }>;
    };
    dinnerData?: {
      isLunch: boolean;
      date: string;
      menu: Array<{
        name: string;
        allergies: Array<number>;
      }>;
    };
  };
}> = ({ meal }) => {
  return (
    <div className="h-full p-4">
      <MealPanel isLunch mealData={meal.lunchData} />
      <MealPanel mealData={meal.dinnerData} />
    </div>
  );
};
