import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import axios, { AxiosError } from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Turnstile } from "@marsidev/react-turnstile";

import { FormLabel } from "@/components/FormLabel";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";
import { headers } from 'next/headers';
import { da } from 'date-fns/locale';
import { ImageProps } from 'next/image';
import { redirect, useRouter } from "next/navigation";
import { error } from 'console';

const schema = yup
  .object({
    username:yup.string().required(),
    name: yup.string().min(2).max(4).required(),
    studentId: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required(),
    profileImg: yup.mixed<Array<File>>().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const SignupInformationView: React.FC<{ next: () => void }> = ({
  next,
}) => {
  const form = useForm<FormData>({ resolver: yupResolver(schema) });
  const { register, handleSubmit } = form;
  const [token, setToken] = useState("");

  const convertBase64 = (file:File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 w-full max-w-[420px] mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          const file = data.profileImg[0];
          const base64 = await convertBase64(file);
          try {
            const content = {
              username: data.username,
              name: data.name,
              grade: data.studentId,
              email: data.email,
              password: data.password,
              card_img: base64,
              token : token,
            }
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URI!}/user/register/`,
              content
            );
            
            if (response.status === 201) {
              next();
            }
          } catch (e) {
            const error = e as AxiosError;
            switch (error.response?.status) {
              case 400:
                const data = error.response.data;
                console.log(data);
                let msg = ""
                if (data?.hasOwnProperty("password")) {
                  msg += "비밀번호가 적절하지 않습니다.\n<비밀번호 조건>\n1. 8자 이상\n2. 너무 쉬운 비밀번호가 아니어야 함.\n3. 문자,특수문자 혼합\n";
                  if (data?.hasOwnProperty("email")) {
                    msg +="---------------------------\n";
                  }
                }
                if (data?.hasOwnProperty("email")) {
                  msg += "이메일이 이미 존재합니다.\n"
                }                
                return alert(msg);
              case 406:
                return alert("캡챠 인증에 실패했습니다. 다시 시도해주세요.");
              case 409:
                return alert("이미 존재하는 아이디입니다. 다시 시도해주세요.");
            }
          }
        })}
      >
        <FormLabel
          control={<FormInput type="text" {...register("username")} />}
          name="username"
        >
          아이디
        </FormLabel>
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
        <FormLabel
          control={
            <FormInput type='file' {...register("profileImg", {
              required: "학생증 이미지는 필수입니다."})}
            />
          }
          name = "profileImg"
        >
          학생증 사진
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
