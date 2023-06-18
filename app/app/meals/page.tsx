import React from "react";
import { cookies } from "next/headers";

import { format } from "date-fns";

import { GET } from "@/utils/request";
import { MealDetail } from "./components/MealDetail";
import { MealsCalendar } from "./components/Calendar";

export default async function Board() {
  let monthMealData: Array<{
    date: number;
    lunchData: Array<[string, number[]]>;
    dinnerData: Array<[string, number[]]>;
  }> = [];
  const today = new Date();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const response = await GET(
      `/food/${today.getFullYear()}/${today.getMonth() + 1}`,
      token?.value
    );
    monthMealData = response.data;
  } catch (e) {
    console.error(e);
  }
  const todayMeal = monthMealData.find(
    (x) => x.date === Number(format(today, "yyyyMMdd"))
  );
  return (
    <div className="p-4 gap-4 flex-grow flex flex-col md:grid flex-shrink md:grid-cols-2 lg:grid-cols-3">
      <div className="row-span-2 col-span-2 min-h-[540px] flex flex-col">
        <MealsCalendar meals={monthMealData} />
      </div>
      <MealDetail
        meal={{
          date: new Date(),
          lunch: todayMeal!.lunchData.map((x) => {
            return {
              name: x[0],
              allergy: x[1],
            };
          }),
          dinner: todayMeal!.dinnerData.map((x) => {
            return {
              name: x[0],
              allergy: x[1],
            };
          }),
        }}
        menuKey="lunch"
      />
      <MealDetail
        meal={{
          date: new Date(),
          lunch: todayMeal!.lunchData.map((x) => {
            return {
              name: x[0],
              allergy: x[1],
            };
          }),
          dinner: todayMeal!.dinnerData.map((x) => {
            return {
              name: x[0],
              allergy: x[1],
            };
          }),
        }}
        menuKey="dinner"
      />
    </div>
  );
}
