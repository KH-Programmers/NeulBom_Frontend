"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SignupTaskList } from "@/app/signup/components/SignupTaskList";
import { SignupAgreementView } from "@/app/signup/views/SignupAgreementView";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="border-4 rounded-2xl p-8 max-w-[600px] border-primary bg-white flex flex-col items-center w-full">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-black text-3xl">회원가입</h1>
        </div>
        <SignupTaskList />
        <SignupAgreementView />
      </div>
    </div>
  );
};

export default SignIn;
