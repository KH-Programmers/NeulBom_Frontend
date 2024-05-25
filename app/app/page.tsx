import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AxiosError } from "axios";

import { GET } from "@/utils/request";
import { MainCard } from "./components/MainCard";
import { MainBanner } from "./components/MainBanner";
import { TodayMealPanel } from "./components/panels/TodayMealPanel";
import { TodayTodoPanel } from "./components/panels/TodayTodoPanel";
import { PopularPostsPanel } from "./components/panels/PopularPostsPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeulBom",
  description: "늘봄에 오신 것을 환영합니다.",
};

const getDateString = (date: string) => {
  const now = new Date();
  const target = new Date(
    Date.UTC(
      parseInt(date.substring(0, 4)),
      parseInt(date.substring(4, 6)) - 1,
      parseInt(date.substring(6, 8)),
      9,
    ),
  );
  const diff = target.getTime() - now.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return "오늘";
  }
  if (diffDays === 1) {
    return "내일";
  }
  if (diffDays === 2) {
    return "모레";
  }
  return `${Math.abs(diffDays)}일 ${diffDays > 0 ? "후" : "전"}`;
};

export default async function AppMain() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  const requestMealData = await GET("/meal/");
  const mealData: Array<{
    isLunch: boolean;
    date: string;
    menu: Array<{
      name: string;
      allergies: Array<number>;
    }>;
  }> = await requestMealData?.data;
  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 flex-grow">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="인기글">
          <PopularPostsPanel posts={[]} />
        </MainCard>
        <MainCard title={`${getDateString(mealData[0].date)}의 급식`}>
          <TodayMealPanel
            meal={{
              lunchData: mealData.find((data) => data.isLunch),
              dinnerData: mealData.find((data) => !data.isLunch),
            }}
          />
        </MainCard>
        <MainCard title="오늘의 일정">
          <TodayTodoPanel />
        </MainCard>
      </div>
    </div>
  );
}
