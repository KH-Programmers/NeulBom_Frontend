import React from "react";
import { MealsCalendar } from "./components/Calendar";

const Board: React.FC = () => {
  return (
    <div className="p-4 flex-grow grid h-0">
      <MealsCalendar />
    </div>
  );
};

export default Board;
