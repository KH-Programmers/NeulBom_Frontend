import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";

import { GET } from "@utils/request";
import { MainCard } from "./components/MainCard";
import { MainBanner } from "./components/MainBanner";
import { TodayMealPanel } from "./components/panels/TodayMealPanel";
import { TodayTodoPanel } from "./components/panels/TodayTodoPanel";
import { LatestPostsPanel } from "./components/panels/LatestPostsPanel";
import { Article } from "@/app/app/posts/[id]/types";

export const metadata: Metadata = {
  title: "NeulBom",
  description: "늘봄에 오신 것을 환영합니다.",
};

const getDateString = (date?: string) => {
  if (!date) {
    return "오늘";
  }
  const now = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      9,
    ),
  );
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

  let articles: Article[] = [];
  try {
    const response = await GET("/board/all", token?.value);
    articles = await response!.data;
    if (articles.length > 7) {
      articles = articles.slice(0, 7);
    }
  } catch (e) {
    articles = [];
  }
  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 flex-grow">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="최신글">
          <LatestPostsPanel posts={articles} />
        </MainCard>
        <MainCard title={`${getDateString(mealData[0]?.date)}의 급식`}>
          <TodayMealPanel
            meal={
              mealData.length
                ? {
                    lunchData: mealData.find((data) => data.isLunch),
                    dinnerData: mealData.find((data) => !data.isLunch),
                  }
                : {}
            }
          />
        </MainCard>
        <MainCard title="오늘의 일정">
          <TodayTodoPanel />
        </MainCard>
      </div>
    </div>
  );
}
