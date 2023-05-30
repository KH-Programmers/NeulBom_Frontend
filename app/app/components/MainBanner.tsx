"use client";

import { registerSwiper } from "@/utils/swiper";
import React from "react";

registerSwiper();

export const MainBanner: React.FC = () => {
  const [swiperContent, setSwiperContent] = React.useState<React.ReactNode>(
    <></>
  );

  React.useEffect(() => {
    setSwiperContent(
      <swiper-container pagination={true} autoplay autoplay-delay={2000}>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center">Slide 1</div>
        </swiper-slide>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center">Slide 2</div>
        </swiper-slide>
        <swiper-slide>
          <div className="h-24 flex justify-center items-center">Slide 3</div>
        </swiper-slide>
      </swiper-container>
    );
  }, []);

  return (
    <div className="bg-white rounded-xl shadow h-24">
      {typeof window !== "undefined" && swiperContent}
    </div>
  );
};
