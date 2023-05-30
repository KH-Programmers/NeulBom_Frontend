import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="px-10 md:px-40 2xl:px-52">
        <h1
          className="font-black text-4xl md:text-5xl 2xl:text-6xl text-left w-5/6 sm:w-1/2 md:w-[80%] xl:w-[55%] 2xl:w-[55%] bg-gradient-to-br text-transparent bg-clip-text from-[#008171] to-[#0070C1]"
          style={{ lineHeight: "1.1" }}
        >
          Always Look at My own school,
        </h1>
        <h1 className="mt-1 font-black text-5xl md:text-6xl 2xl:text-7xl text-left bg-gradient-to-br text-transparent bg-clip-text from-[#E074A4] to-[#BE123C]">
          늘봄
        </h1>
        <Link href="/signin">
          <div className="mt-6 bg-[#30304B] w-min md:text-xl 2xl:text-2xl rounded-2xl drop-shadow-md">
            <h1 className="whitespace-nowrap text-white font-black px-14 md:px-20 py-3 md:py-4">
              바로가기
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
