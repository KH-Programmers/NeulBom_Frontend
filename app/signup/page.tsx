"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import lion from "@/assets/lion.png";

import { TbLock, TbUserCircle } from "react-icons/tb";
import GoogleLogo from "@/assets/google.svg";
import { SiKakao, SiNaver } from "react-icons/si";
import { LoginInputField } from "@/components/LoginInputField";
import { Checkbox } from "@/components/Checkbox";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="border-4 rounded-2xl p-8 max-w-[600px] border-primary bg-white flex flex-col items-center w-full">
        <div className="max-w-[360px] w-full flex flex-col items-center">
          <h1 className="font-black text-4xl">회원가입</h1>
          <div>
            <ol className="flex items-center w-full">
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#656565] after:border-4 after:inline-block">
                <span className="flex items-center justify-center w-10 h-10 bg-primary rounded-full lg:h-12 lg:w-12 shrink-0" />
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#656565] after:border-4 after:inline-block">
                <span className="flex items-center justify-center w-10 h-10 bg-[#D9D9D9] rounded-full lg:h-12 lg:w-12 shrink-0" />
              </li>
              <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-[#D9D9D9] rounded-full lg:h-12 lg:w-12 shrink-0" />
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
