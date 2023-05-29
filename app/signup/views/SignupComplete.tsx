import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { TbCircleCheck } from "react-icons/tb";

export const SignupComplete: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <motion.div
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 270, 270, 0],
        }}
        className="mt-4"
      >
        <TbCircleCheck className="w-32 h-32 mx-auto text-primary" />
      </motion.div>
      <div className="w-min mx-auto">
        <h1 className="w-min whitespace-nowrap text-2xl font-bold mx-auto mt-4">
          이제 접속할 준비가 되었어요!
        </h1>
        <Link href="/signin">
          <button className="w-full text-center bg-primary text-white font-bold text-lg px-12 py-2 rounded-xl mt-4">
            로그인하기
          </button>
        </Link>
      </div>
    </div>
  );
};
