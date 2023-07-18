"use client";

import { registerSwiper } from "@/utils/swiper";
import React from "react";

registerSwiper();

export const MainBanner: React.FC = () => {
  const [swiperContent, setSwiperContent] = React.useState<React.ReactNode>(
    <></>,
  );

  React.useEffect(() => {
    setSwiperContent(
      <swiper-container pagination={true} autoplay autoplay-delay={2000}>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center"><a href='https://www.instagram.com/neulbom_inform/'>늘봄 인스타 팔로우하기</a></div>
        </swiper-slide>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center"><a href='https://yeonhj.notion.site/1-Beyond-GPT-Forum-5d14a08e7bfe4139844d861fa6783572?pvs=4'>제 1회 Beyond-GPT 포럼 알아보기</a></div>
        </swiper-slide>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center"><a href='https://docs.google.com/forms/d/e/1FAIpQLSftDZbReWqm-IHfLuOxUI-55c_PmEUJWJuTQ0CUPOCUc8RfGg/viewform?usp=sf_link'>늘봄 커뮤니티 관리자 모집</a></div>
        </swiper-slide>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center"><a href='https://docs.google.com/forms/d/e/1FAIpQLSfRcU7xgZpA4TsRrxJs3zc2KYzElTyMtNk5LlHKhPhFaFKr-Q/viewform?usp=sf_link'>버그 제보하기</a></div>
        </swiper-slide>
      </swiper-container>,
    );
  }, []);

  return (
    <div className="bg-white rounded-xl shadow h-24">
      {typeof window !== "undefined" && swiperContent}
    </div>
  );
};
