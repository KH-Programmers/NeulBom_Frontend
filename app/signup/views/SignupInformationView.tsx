import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Turnstile } from "@marsidev/react-turnstile";

import { FormLabel } from "@/components/FormLabel";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";

const schema = yup
  .object({
    name: yup.string().min(2).max(4).required(),
    studentId: yup.string().length(5).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호 재확인이 일치하지 않습니다.")
      .required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const SignupInformationView: React.FC<{ next: () => void }> = ({
  next,
}) => {
  const form = useForm<FormData>({ resolver: yupResolver(schema) });
  const { register, handleSubmit } = form;
  const [token, setToken] = useState("");

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 w-full max-w-[420px] mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URI!}/user/register/`,
              {
                username: data.name,
                grade: data.studentId,
                email: data.email,
                password: data.password,
                token: token,
              }
            );
            if (response.status === 201) {
              next();
            }
          } catch (e) {
            const error = e as AxiosError;
            console.log(error.response);
            switch (error.response?.status) {
              case 400:
                return alert("잘못된 정보를 입력했습니다. 다시 확인해주세요.");
              case 406:
                return alert("캡챠 인증에 실패했습니다. 다시 시도해주세요.");
              case 409:
                return alert("이미 존재하는 아이디입니다. 다시 시도해주세요.");
            }
          }
        })}
      >
        <FormLabel
          control={<FormInput type="text" {...register("name")} />}
          name="name"
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
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTLIE_SITE_KEY!}
          className="mt-4 mx-auto"
          onSuccess={(token) => {
            setToken(token);
          }}
        />
        <Button type="submit" className="mt-4">
          가입하기
        </Button>
      </form>
    </FormProvider>
  );
};
