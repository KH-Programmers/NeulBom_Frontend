import React from "react";

import { GET } from "@/utils/request";
import { MainCard } from "./components/MainCard";
import { MainBanner } from "./components/MainBanner";
import { TodayMealPanel } from "./components/panels/TodayMealPanel";
import { TodayTodoPanel } from "./components/panels/TodayTodoPanel";
import { PopularPostsPanel } from "./components/panels/PopularPostsPanel";
import { cookies } from 'next/headers';

export default async function AppMain() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let data: {
    foodData?: {
      date: number;
      lunchData: Array<[string, number[]]>;
      dinnerData: Array<[string, number[]]>;
    };
    articleData?: Array<{
      id: number;
      authorName: string;
      title: string;
      commentCount: number;
      viewCounts: number;
      updatedAt: string;
      likeCount: number;
    }>;
    eventData?: Array<{
      date: number;
      eventName: string | null;
      type: string | null;
    }>;
    requester?: {
      username: string;
    };
  } = {
    eventData: [
      {
        date: 20230604,
        eventName: null,
        type: null,
      },
      {
        date: 20230605,
        eventName: "재량휴업일",
        type: "재량휴업일",
      },
      {
        date: 20230606,
        eventName: "현충일",
        type: "공휴일",
      },
      {
        date: 20230607,
        eventName: null,
        type: null,
      },
      {
        date: 20230608,
        eventName: null,
        type: null,
      },
      {
        date: 20230609,
        eventName: null,
        type: null,
      },
      {
        date: 202306010,
        eventName: null,
        type: null,
      },
    ],
    requester: {
      username: "Yeon",
    },
  };
  try {
    const response = await GET("/", token?.value);
    data = response.data;
  } catch (e) {
    console.error(e);
  }
  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 flex-grow">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="인기글">
          <PopularPostsPanel posts={data.articleData ?? []} />
        </MainCard>
        <MainCard title="오늘의 급식">
          <TodayMealPanel meal={data.foodData!} />
        </MainCard>
        <MainCard title="오늘의 일정">
          <TodayTodoPanel />
        </MainCard>
      </div>
    </div>
  );
}
