"use client";

import { isSameDate } from "@h6s/calendar";
import clsx from "clsx";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React from "react";

const year = new Date().getFullYear();
const month = new Date().getMonth();

export const MealsCalendar: React.FC = () => {
  const weeksToDisplay = React.useMemo(() => {
    const monthDate = new Date(year, month);
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
  }, []);

  return (
    <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden w-full h-full">
      <div className="flex-grow h-0 overflow-auto">
        <div className="p-4 w-fit h-full min-w-full">
          <div className="w-full h-full">
            <table className="w-full h-full border-separate" cellSpacing={12}>
              <tbody>
                {weeksToDisplay.map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td
                        key={j}
                        className={clsx(
                          "relative border-4 align-top p-4 min-w-[160px] rounded-lg",
                          {
                            "border-primary": isToday(day),
                          }
                        )}
                      >
                        <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center opacity-40 text-4xl font-black select-none pointer-events-none">
                          {format(day, "d")}
                        </div>
                        &nbsp;
                        <span>
                          ㅁㄴㅇㄹ,ㅁㄴ
                          ㅇㄹ,ㅁㄴㅇㄹ,ㅁㄴㅇㄹ,ㅁㄴ,ㄹㅁㄴㅇ,ㄹㅁㄴㅇ,ㄹ,ㅁㄴㅇㄹ,
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
