import React from "react";
import { MealsCalendar } from "./components/Calendar";
import { MealDetail } from "./components/MealDetail";

const Board: React.FC = () => {
  return (
    <div className="p-4 gap-4 flex-grow flex flex-col md:grid flex-shrink md:grid-cols-2 lg:grid-cols-3">
      <div className="row-span-2 col-span-2 min-h-[540px] flex flex-col">
        <MealsCalendar />
      </div>
      <MealDetail />
      <MealDetail />
    </div>
  );
};

export default Board;
