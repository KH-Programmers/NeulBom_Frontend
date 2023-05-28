import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormLabel } from "@/components/FormLabel";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/Button";

type FormType = {
  name: string;
  studentId: string;
  phone: string;

  password: string;
  passwordConfirm: string;
};

export const SignupInformationView: React.FC = () => {
  const form = useForm<FormType>();

  const onSubmit = React.useCallback((data: FormType) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...form}>
      <form
        className="mt-4 w-full max-w-[420px] mx-auto flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormLabel
          control={
            <FormInput
              type="text"
              {...form.register("name", {
                required: "이름은 필수입니다",
                minLength: {
                  value: 2,
                  message: "asdf",
                },
                maxLength: {
                  value: 4,
                  message: "asdf",
                },
              })}
            />
          }
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
              {...form.register("studentId", {
                required: "학번은 필수입니다",
                minLength: 5,
                maxLength: 5,
              })}
            />
          }
          name="studentId"
        >
          학번
        </FormLabel>
        <FormLabel
          control={
            <FormInput
              type="text"
              {...form.register("phone", {
                required: "전화번호는 필수입니다",
              })}
            />
          }
          name="phone"
        >
          전화번호
        </FormLabel>
        <FormLabel
          control={
            <FormInput
              type="text"
              {...form.register("password", {
                required: "비밀번호는 필수입니다",
              })}
            />
          }
          name="password"
        >
          비밀번호
        </FormLabel>
        <FormLabel
          control={
            <FormInput
              type="text"
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
