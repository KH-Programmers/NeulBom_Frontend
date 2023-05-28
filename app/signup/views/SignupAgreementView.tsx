import React from "react";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { FormProvider, useForm } from "react-hook-form";
import { FormLabel } from "@/components/FormLabel";

export const SignupAgreementView: React.FC<{ next: () => void }> = ({
  next,
}) => {
  const methods = useForm();

  const { handleSubmit, register, control } = methods;

  const onSubmit = React.useCallback(() => {
    next();
  }, [next]);

  return (
    <FormProvider {...methods}>
      <form className="block w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 rounded-xl border-black overflow-hidden">
          <div className="p-4 max-h-[240px] overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium assumenda consequuntur deserunt dignissimos, eius est ex
            excepturi fugit libero modi nesciunt, nostrum officia possimus quia
            recusandae reiciendis tempore ut, voluptatibus. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Aliquid consectetur deleniti
            distinctio doloribus earum enim ex expedita iure laboriosam magni
            minima non perspiciatis praesentium quae, repudiandae totam vero,
            voluptas? Nulla? Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Expedita maiores neque quis. Asperiores beatae est expedita
            nihil nisi qui sequi tempore ullam. Accusamus at error explicabo
            natus qui quia voluptatem.
          </div>
        </div>

        <FormLabel
          name="agreeTerms"
          control={
            <Checkbox
              {...register("agreeTerms", {
                required: "약관 동의는 필수입니다.",
              })}
            />
          }
        >
          이용약관에 동의합니다
        </FormLabel>
        <div className="mt-4 border-2 rounded-xl border-black overflow-hidden">
          <div className="p-4 max-h-[240px] overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium assumenda consequuntur deserunt dignissimos, eius est ex
            excepturi fugit libero modi nesciunt, nostrum officia possimus quia
            recusandae reiciendis tempore ut, voluptatibus. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Aliquid consectetur deleniti
            distinctio doloribus earum enim ex expedita iure laboriosam magni
            minima non perspiciatis praesentium quae, repudiandae totam vero,
            voluptas? Nulla? Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Expedita maiores neque quis. Asperiores beatae est expedita
            nihil nisi qui sequi tempore ullam. Accusamus at error explicabo
            natus qui quia voluptatem.
          </div>
        </div>
        <FormLabel
          name="agreePrivacy"
          control={
            <Checkbox
              {...register("agreePrivacy", {
                required: "개인정보 수집/이용 동의는 필수입니다.",
              })}
            />
          }
        >
          개인정보 수집 및 이용에 대해 동의합니다
        </FormLabel>
        <Button type="submit" className="mt-4">
          다음
        </Button>
      </form>
    </FormProvider>
  );
};
