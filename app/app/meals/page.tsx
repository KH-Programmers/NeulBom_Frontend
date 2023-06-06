import React from "react";
import { MealsCalendar } from "./components/Calendar";
import { MealDetail } from "./components/MealDetail";
import { MealOfDate } from "./type";

const TodayMeal: MealOfDate = {
  date: new Date(),
  lunch: [
    {
      name: "흰밥",
      allergy: null,
    },
    {
      name: "순대국",
      allergy: [2, 5, 6, 10, 13, 16],
    },
    {
      name: "아삭고추된장무침",
      allergy: [15, 6, 3],
    },
    {
      name: "치킨직화스테이크/스위트칠리소",
      allergy: [2, 5, 6, 12, 13, 15],
    },
    {
      name: "깍두기",
      allergy: [9],
    },
    {
      name: "사과쥬스",
      allergy: null,
    },
  ],
  dinner: [
    {
      name: "불고기생야채비빔밥",
      allergy: [5, 6, 16],
    },
    {
      name: "미소국",
      allergy: [5, 6],
    },
    {
      name: "단무지무침",
      allergy: null,
    },
    {
      name: "새우볼",
      allergy: [1, 5, 6, 9],
    },
    {
      name: "배추김치",
      allergy: [9],
    },
    {
      name: "포도쥬스",
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
