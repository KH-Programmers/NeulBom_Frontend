import React from "react";
import { MealsCalendar } from "./components/Calendar";
import { MealDetail } from "./components/MealDetail";
import { MealOfDate } from "./type";

const TodayMeal: MealOfDate = {
  date: new Date(),
  lunch: [
    {
      name: "장조림버터비빔밥",
      allergy: [1,2,16],
    },
    {
      name: "가쓰오장국",
      allergy: [1, 2, 5, 6, 9],
    },
    {
      name: "오이도라지초무침",
      allergy: [13],
    },
    {
      name: "감자볼튀김",
      allergy: [5, 6],
    },
    {
      name: "배추김치",
      allergy: [9],
    },
    {
      name: "조리퐁라떼",
      allergy: [1, 2, 5, 6],
    },
  ],
  dinner: [
    {
      name: "쌀밥",
      allergy: null,
    },
    {
      name: "비빔막국수",
      allergy: [3, 6],
    },
    {
      name: "배추국",
      allergy: [5, 6],
    },
    {
      name: "보쌈",
      allergy: [5, 6, 10],
    },
    {
      name: "부추야채무침",
      allergy: [5, 6],
    },
    {
      name: "배추김치",
      allergy: [9],
    },
    {
      name: "망고쥬스",
      allergy: [13],
    },
  ],
};

const Board: React.FC = () => {
  return (
    <div className="p-4 gap-4 flex-grow flex flex-col md:grid flex-shrink md:grid-cols-2 lg:grid-cols-3">
      <div className="row-span-2 col-span-2 min-h-[540px] flex flex-col">
        <MealsCalendar />
      </div>
      <MealDetail meal={TodayMeal} menuKey="lunch" />
      <MealDetail meal={TodayMeal} menuKey="dinner" />
    </div>
  );
};

export default Board;
