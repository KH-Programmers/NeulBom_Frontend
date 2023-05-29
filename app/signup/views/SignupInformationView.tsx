import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormLabel } from "@/components/FormLabel";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

export const SignupInformationView: React.FC = () => {
  const form = useForm<FormData>({ resolver: yupResolver(schema) });
  const { register, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 w-full max-w-[420px] mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
        <Button type="submit" className="mt-4">
          가입하기
        </Button>
      </form>
    </FormProvider>
  );
};

export async function getServerSideProps(data: FormData) {
  const response = await fetch("http://127.0.0.1:8000/user/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, /",
    },
    body: JSON.stringify({
      username: data.name,
      email: data.email,
      password: data.password,
    }),
  });
  return {
    props: response,
  };
}
