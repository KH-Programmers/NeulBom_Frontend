import React from "react";
import { MainBanner } from "./components/MainBanner";
import { MainCard } from "./components/MainCard";

const AppMain: React.FC = () => {
  return (
    <div className="p-4 flex flex-col flex-grow gap-4">
      <MainBanner />
      <div className="flex-grow gap-4 lg:flex-row flex-col grid md:grid-cols-2 lg:grid-cols-3">
        <MainCard title="인기글">asdf</MainCard>
        <MainCard title="오늘의 급식">asdf</MainCard>
        <MainCard title="오늘의 일정">asdf</MainCard>
      </div>
    </div>
  );
};

export default AppMain;
