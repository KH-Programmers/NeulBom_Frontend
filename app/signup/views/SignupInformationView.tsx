import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormLabel } from "@/components/FormLabel";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";
import Captcha from "@/utils/captcha";
import { HashLoader } from "react-spinners";
import { POST } from "@/utils/request";

const schema = yup
  .object({
    userId: yup.string().required("아이디는 필수 사항입니다."),
    username: yup
      .string()
      .min(2, "이름은 최소 2글자 이상이여야 합니다.")
      .max(4, "이름은 최대 4글자입니다.")
      .required("이름은 필수 사항입니다."),
    studentId: yup
      .string()
      .length(5, "학번은 5자리여야 합니다.")
      .required("학번은 필수 사항입니다."),
    email: yup.string().email().required("이메일은 필수 사항입니다."),
    password: yup.string().required("비밀번호는 필수 사항입니다."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 재입력은 필수 사항입니다."),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const SignupInformationView: React.FC<{ next: () => void }> = ({
  next,
}) => {
  const form = useForm<FormData>({ resolver: yupResolver(schema) });
  const { register, handleSubmit } = form;
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 w-full max-w-[420px] mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          setIsLoading(true);
          try {
            const response = await POST("/user/signup/", {
              userId: data.userId,
              username: data.username,
              studentId: data.studentId,
              email: data.email,
              password: data.password,
              token: token,
            });

            if (response.status === 201) {
              next();
            }
          } catch (e) {
            const error = e as AxiosError;
            switch (error.response?.status) {
              case 400:
                const data = error.response.data;
                let msg = "";
                if (data?.hasOwnProperty("password")) {
                  msg +=
                    "비밀번호가 적절하지 않습니다.\n<비밀번호 조건>\n1. 8자 이상\n2. 너무 쉬운 비밀번호가 아니어야 함.\n3. 문자,특수문자 혼합\n";
                  if (data?.hasOwnProperty("email")) {
                    msg += "---------------------------\n";
                  }
                }
                if (data?.hasOwnProperty("email")) {
                  msg += "이메일이 이미 존재합니다.\n";
                }
                return alert(msg);
              case 406:
                return alert("캡챠 인증에 실패했습니다. 다시 시도해주세요.");
              case 409:
                return alert("이미 존재하는 아이디입니다. 다시 시도해주세요.");
            }
          } finally {
            setIsLoading(false);
          }
        })}
      >
        <FormLabel
          control={<FormInput type="text" {...register("userId")} />}
          name="userId"
        >
          아이디
        </FormLabel>
        <FormLabel
          control={<FormInput type="text" {...register("username")} />}
          name="nickname"
        >
          이름
        </FormLabel>
        <FormLabel
          control={
            <FormInput
              type="text"
              minLength={5}
              maxLength={5}
              {...register("studentId")}
            />
          }
          name="studentId"
        >
          학번
        </FormLabel>
        <FormLabel
          control={<FormInput type="text" {...register("email")} />}
          name="email"
        >
          이메일
        </FormLabel>
        <FormLabel
          control={<FormInput type="password" {...register("password")} />}
          name="password"
        >
          비밀번호
        </FormLabel>
        <FormLabel
          control={
            <FormInput
              type="password"
              {...form.register("passwordConfirm", {
                required: "비밀번호 확인은 필수입니다",
              })}
            />
          }
          name="passwordConfirm"
        >
          비밀번호 재입력
        </FormLabel>
        <Captcha
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
          onVerify={(token: string, ekey: string) => {
            setToken(token);
          }}
        />
        <div className="mt-4 transition-all ease-in duration-100">
          {!isLoading ? (
            <Button type="submit">가입하기</Button>
          ) : (
            <HashLoader
              color="#9E1915"
              size={36}
              className="mx-auto mb-4"
              loading={isLoading}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
