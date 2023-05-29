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
import { Button } from "@/components/Button";
import { type } from 'os';
import { Form } from 'react-hook-form';

type FormType = {
  username : string;
  password : string;
}

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="border-4 rounded-2xl p-8 max-w-[600px] border-primary bg-white flex flex-col items-center w-full">
        <div className="max-w-[360px] w-full flex flex-col items-center">
          <Image width={64} src={lion} alt="logo" />
          <form
            className="mt-8 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              getServerSideProps({
                username:"연현중",
                password:"1234"
              })
            }}
          >
            <div className="divide-y-2 border-2 rounded-xl">
              <LoginInputField
                tabIndex={0}
                required
                icon={TbUserCircle}
                placeholder="아이디"
                autoComplete="username"
                type="text"
              />
              <LoginInputField
                tabIndex={0}
                required
                icon={TbLock}
                placeholder="비밀번호"
                type="password"
              />
            </div>
            <div className="mt-2">
              <label className="flex gap-2 items-center font-bold">
                <Checkbox />
                로그인 상태 유지
              </label>
            </div>
            <Button className="mt-6" type="submit">
              로그인
            </Button>
          </form>
          <div className="flex w-full items-center gap-4 mt-2">
            <div className="flex-grow border-b border-black/20" />
            또는
            <div className="flex-grow border-b border-black/20" />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Link
              href="/"
              className="rounded-full shadow flex justify-center items-center w-12 h-12 bg-[#03c75a] overflow-hidden"
              tabIndex={0}
            >
              <SiNaver size={16} color="white" />
            </Link>
            <Link
              href="/"
              className="rounded-full shadow justify-center flex items-center w-12 h-12 bg-white overflow-hidden"
              tabIndex={0}
            >
              <Image
                src={GoogleLogo}
                alt="google"
                draggable="false"
                className="select-none"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="/"
              className="rounded-full shadow justify-center flex items-center w-12 h-12 bg-[#FEE500] overflow-hidden"
              tabIndex={0}
            >
              <SiKakao size={28} color="black" />
            </Link>
          </div>
          <div className="flex gap-4 mt-4 justify-center w-full">
            <div className="relative">
              <a href="/signup" className="absolute right-4 whitespace-nowrap">
                가입하기
              </a>
              <span className="text-black/40">|</span>
              <a href="/forgot" className="absolute left-4 whitespace-nowrap">
                비밀번호 찾기
              </a>
            </div>
          </div>
          <h1 className="text-center font-extralight mt-4">
            Powered By{" "}
            <Link
              href="https://kyungheeboy.hs.kr/"
              className="font-bold text-primary"
            >
              KyungHee
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps(data:FormType) {
  console.log(JSON.stringify(data))
  const response =await fetch("http://127.0.0.1:8000/user/login/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(data),
        })
  console.log(response)
}