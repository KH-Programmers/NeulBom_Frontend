import React from "react";
import Image from "next/image";

import Lion from '../../public/assets/lion.svg';

const SignIn = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-4 border-[#9E1915] rounded-lg w-1/2 h-1/2 flex justify-center items-center bg-white">
        <div className='flex items-center gap-12'>
          <h1 className='text-transparent font-black bg-clip-text 2xl:text-7xl bg-gradient-to-br from-[#FAE8FF] to-[#FFFCED] textStroke'>NeulBom</h1>
          <h1 className='2xl:text-6xl font-semibold'>X</h1>
          <div className='w-1/2 h-1/2'>
            <Image src={Lion} alt='' className='w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;