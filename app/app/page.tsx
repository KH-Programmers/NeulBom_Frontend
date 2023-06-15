import React from "react";

import { cookies } from "next/headers";

import { GET } from "@/utils/request";
import { MainCard } from "./components/MainCard";
import { MainBanner } from "./components/MainBanner";
import { TodayMealPanel } from "./components/panels/TodayMealPanel";
import { TodayTodoPanel } from "./components/panels/TodayTodoPanel";
import { PopularPostsPanel } from "./components/panels/PopularPostsPanel";

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
    foodData: {
      date: 20230602,
      lunchData: [
        ["계란야채볶음밥/치즈함박", [1, 2, 5, 6, 10, 12, 13, 15, 16]],
        ["미소국", [5, 6]],
        ["볼어묵조림", [1, 5, 6, 13]],
        ["배추김치", [9]],
        ["카프리썬", [11, 12]],
        ["꽃맛살샐러드", [1, 5, 6, 8, 13, 18]],
      ],
      dinnerData: [
        ["참치주먹밥", [1, 5]],
        ["돈코츠라멘", [1, 2, 5, 6, 10, 13, 15, 16]],
        ["배추김치", [9]],
        ["팝콘", [2, 5]],
        ["초코우유", [2]],
        ["열대과일샐러드", [1, 2, 5, 6, 11]],
      ],
    },
    articleData: [
      {
        id: 5,
        authorName: "flandrescarlet",
        title: "한국사 너무 어려워요",
        commentCount: 0,
        viewCounts: 445,
        updatedAt: "2023-06-09T15:34:52.326915",
        likeCount: 18,
      },
    ],
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
    const response = await GET("");
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
