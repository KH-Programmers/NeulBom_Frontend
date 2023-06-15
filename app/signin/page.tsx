"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import { SiKakao, SiNaver } from "react-icons/si";
import { TbLock, TbUserCircle } from "react-icons/tb";
import { Turnstile } from "@marsidev/react-turnstile";

import logo from "@/assets/NeulBom.svg";
import GoogleLogo from "@/assets/google.svg";
import { LoginInputField } from "@/components/LoginInputField";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get("/signin/api/").then((res) => {
      if (res.data.code === 200) router.push("/app");
    });
  }, [router]);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="border-4 rounded-2xl p-8 max-w-[600px] border-primary bg-white flex flex-col items-center w-full">
        <div className="max-w-[360px] w-full flex flex-col items-center">
          <Image width={64} src={logo} alt="logo" />
          <form
            className="mt-8 w-full"
            onSubmit={async (e) => {
              e.preventDefault();
              if (token === "") return;
              try {
                await axios.post(`/signin/api/?autoLogin=${autoLogin}`, {
                  username: username,
                  password: password,
                  token: token,
                  autoLogin: autoLogin,
                });
                router.push("/app");
              } catch (e) {
                const error = e as AxiosError;
                switch (error.response?.status) {
                  case 400:
                    return alert("아이디 또는 비밀번호가 잘못되었습니다.");
                  case 406:
                    return alert(
                      "캡챠 인증에 실패했습니다. 다시 시도해주세요."
                    );
                }
              }
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <LoginInputField
                tabIndex={0}
                required
                icon={TbLock}
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label className="flex gap-2 items-center font-bold">
                <Checkbox
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  checked={autoLogin}
                />
                로그인 상태 유지
              </label>
            </div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTLIE_SITE_KEY!}
              className="mt-4 mx-auto"
              onSuccess={(token) => {
                setToken(token);
              }}
            />
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
            {/*
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
            */}
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
