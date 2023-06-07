import React from "react";
import { MealsCalendar } from "./components/Calendar";
import { MealDetail } from "./components/MealDetail";
import { MealOfDate } from "./type";

const TodayMeal: MealOfDate = {
  date: new Date(),
  lunch: [
    {
      name: "참치김치볶음덮밥",
      allergy: [5, 9, 13],
    },
    {
      name: "즉석피자",
      allergy: [1, 2, 5, 6, 10, 12, 13, 15, 16],
    },
    {
      name: "두부미소국",
      allergy: [5, 6],
    },
    {
      name: "깍두기",
      allergy: [9],
    },
    {
      name: "딸기샐러드",
      allergy: [11, 2, 5, 6, 11, 13],
    },
  ],
  dinner: [
    {
      name: "치즈오븐스파게티",
      allergy: [1, 2, 5, 6, 10, 12, 13, 15, 16],
    },
    {
      name: "크로와상",
      allergy: [1, 2, 5, 6],
    },
    {
      name: "카프리썬",
      allergy: [11, 12],
    },
    {
      name: "피클",
      allergy: null,
    },
    {
      name: "메론",
      allergy: null,
    },
    {
      name: "케이준샐러드",
      allergy: [1, 2, 5, 6, 13, 15, 18],
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
