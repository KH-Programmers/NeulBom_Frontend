"use client";

import { isSameDate } from "@h6s/calendar";
import clsx from "clsx";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import React from "react";
import {
  TbArrowLeft,
  TbArrowRight,
  TbChevronRight,
  TbRefresh,
} from "react-icons/tb";

import { Meal } from "../type";

const TodayMeal: { date: Date; lunch: Meal[]; dinner: Meal[] } = {
  date: new Date(),
  lunch: [
    {
      name: "흰밥",
      allergy: null,
    },
    {
      name: "순대국",
      allergy: "2.5.6.10.13.16.",
    },
    {
      name: "아삭고추된장무침",
      allergy: "15.6.13.",
    },
    {
      name: "치킨직화스테이크/스위트칠리소",
      allergy: "2.5.6.12.13.15.",
    },
    {
      name: "깍두기",
      allergy: "9.",
    },
    {
      name: "사과쥬스",
      allergy: null,
    },
  ],
  dinner: [
    {
      name: "불고기생야채비빔밥",
      allergy: "5.6.16.",
    },
    {
      name: "미소국",
      allergy: "5.6.",
    },
    {
      name: "단무지무침",
      allergy: null,
    },
    {
      name: "새우볼",
      allergy: "1.5.6.9.",
    },
    {
      name: "배추김치",
      allergy: "9.",
    },
    {
      name: "포도쥬스",
      allergy: "13.",
    },
  ],
};

export const MealsCalendar: React.FC = () => {
  const [monthDate, setMonthDate] = React.useState(() =>
    startOfMonth(new Date())
  );

  const weeksToDisplay = React.useMemo(() => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const start = startOfWeek(monthStart);
    const end = endOfWeek(monthEnd);

    let current = start;

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    while (current <= end) {
      currentWeek.push(current);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      // add a day
      current = addDays(current, 1);
    }

    return weeks;
  }, [monthDate]);

  return (
    <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden w-full h-full">
      <div className="flex items-center p-8 pb-0 relative">
        <div>asdf</div>
        <div className="flex-grow"></div>
        <div className="flex gap-4">
          <button
            className="p-2 bg-primary rounded-full flex justify-center items-center"
            onClick={() => setMonthDate((v) => subMonths(v, 1))}
          >
            <TbArrowLeft color="white" size={16} />
          </button>
          <button
            className="p-2 bg-primary rounded-full flex justify-center items-center"
            onClick={() => setMonthDate((v) => addMonths(v, 1))}
          >
            <TbArrowRight color="white" size={16} />
          </button>
          <button
            className="p-2 bg-primary rounded-full flex justify-center items-center"
            onClick={() => setMonthDate(startOfMonth(new Date()))}
          >
            <TbRefresh color="white" size={16} />
          </button>
        </div>
      </div>
      <div className="text-center text-4xl w-full font-extrabold mt-4 mb-4">
        {format(monthDate, "MMM yyyy")}
      </div>
      <div className="flex-grow h-0 overflow-auto">
        <div className="w-fit h-full min-w-full">
          <div className="w-full h-full">
            <table className="w-full h-full border-separate" cellSpacing={8}>
              <thead>
                <tr>
                  <th className="font-extrabold text-base text-red-500">일</th>
                  <th className="font-extrabold text-base">월</th>
                  <th className="font-extrabold text-base">화</th>
                  <th className="font-extrabold text-base">수</th>
                  <th className="font-extrabold text-base">목</th>
                  <th className="font-extrabold text-base">금</th>
                  <th className="font-extrabold text-base text-blue-500">토</th>
                </tr>
              </thead>
              <tbody>
                {weeksToDisplay.map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td
                        key={j}
                        className={clsx(
                          "relative border-2 align-top p-3 text-xs min-w-[140px] rounded-lg",
                          {
                            "border-primary": isToday(day),
                            "opacity-40": !isSameMonth(day, monthDate),
                          }
                        )}
                      >
                        <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center opacity-40 text-4xl font-black select-none pointer-events-none">
                          {getDate(day)}
                        </div>
                        {/* &nbsp; */}
                        <span>
                          {TodayMeal.lunch.map((meal, k) => (
                            <p key={k}>
                              {meal.name} ({meal.allergy})
                            </p>
                          ))}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
