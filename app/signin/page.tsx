"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import lion from "../../public/assets/lion.png";
import naver from "../../public/assets/naver.png";
import google from "../../public/assets/google.png";
import kakao from "../../public/assets/kakao.png";

import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-4 border-[#9E1915] rounded-lg bg-white block px-20 py-16">
        <div className="flex justify-center items-center w-1/2 mx-auto">
          <div className="w-1/6 h-1/6 my-8">
            <Image src={lion} alt="" className="w-full h-full" />
          </div>
        </div>
        <form
          className="w-2/5 mx-auto"
          onChange={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-6">
            <div className="border-t-2 border-r-2 border-l-2 border-[#959595] rounded-t-2xl gap-2 w-full px-6 py-4">
              <div className="w-full flex gap-4">
                <AiOutlineUser className="w-[12%] h-[12%]" />
                <input
                  type="text"
                  placeholder="아이디"
                  className="text-[#B9B8B8] font-black text-2xl w-full outline-none rounded-xl"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>
            <div className="border-2 border-[#959595] rounded-b-2xl gap-2 w-full px-6 py-4">
              <div className="w-full flex gap-4">
                <RiLockPasswordFill className="w-[12%] h-[12%]" />
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="text-[#B9B8B8] font-black text-2xl w-full outline-none rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2.5 my-2">
              <input
                type="checkbox"
                className="outline-none w-4 h-4"
                checked={isLogin}
                onChange={(e) => setIsLogin(e.target.checked)}
              />
              <button onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}>
                <h1 className="text-lg 2xl:text-xl font-extrabold">로그인 상태 유지</h1>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#9E1915] text-white text-2xl font-black w-full rounded-2xl py-4"
          >
            로그인
          </button>
        </form>
        <div className="w-2/5 mx-auto flex justify-around my-4">
          <Link href="/" className="w-[10%] h-[10%]">
            <Image src={naver} alt="" className="w-full h-full" />
          </Link>
          <Link href="/" className="w-[10%] h-[10%]">
            <Image src={google} alt="" className="w-full h-full" />
          </Link>
          <Link href="/" className="w-[10%] h-[10%]">
            <Image src={kakao} alt="" className="w-full h-full" />
          </Link>
        </div>
        <div className="w-2/5 mx-auto flex justify-around">
          <Link
            href="/signup"
            className="font-black text-lg underline underline-offset-2"
          >
            아직 계정이 없나요?
          </Link>
          <Link
            href="/forgotPassword"
            className="font-black text-lg underline underline-offset-2"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
