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

export default async function AppMain() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const response = await GET("/", token?.value);
  } catch (e) {
    const error = e as AxiosError;
    if (error.response?.status === 401) {
      return redirect("/signin");
    }
  }
  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 flex-grow">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="인기글">
          <PopularPostsPanel posts={[]} />
        </MainCard>
        <MainCard title="오늘의 급식">
          {/*<TodayMealPanel meal={data.foodData!} />*/}
        </MainCard>
        <MainCard title="오늘의 일정">
          <TodayTodoPanel />
        </MainCard>
      </div>
    </div>
  );
}
