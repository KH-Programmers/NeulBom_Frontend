import React from "react";
import { MainBanner } from "./components/MainBanner";
import { MainCard } from "./components/MainCard";
import { PopularPostsPanel } from "./components/panels/PopularPostsPanel";
import { TodayMealPanel } from "./components/panels/TodayMealPanel";
import { TodayTodoPanel } from "./components/panels/TodayTodoPanel";

const AppMain: React.FC = () => {
  return (
    <div className="p-4 flex flex-col w-full h-full gap-4 flex-grow">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="인기글">
          <PopularPostsPanel />
        </MainCard>
        <MainCard title="오늘의 급식">
          <TodayMealPanel />
        </MainCard>
        <MainCard title="오늘의 일정">
          <TodayTodoPanel />
        </MainCard>
      </div>
    </div>
  );
};

export default AppMain;
