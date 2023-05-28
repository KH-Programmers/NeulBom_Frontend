"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SignupTaskList } from "@/app/signup/components/SignupTaskList";
import { SignupAgreementView } from "@/app/signup/views/SignupAgreementView";
import { SignupStep } from "@/app/signup/types";

const SignUp = () => {
  const [currentStep, setCurrentStep] = React.useState(SignupStep.Agreement);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <div className="border-4 rounded-2xl p-8 max-w-[600px] border-primary bg-white flex flex-col items-center w-full">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-black text-3xl">회원가입</h1>
        </div>
        <SignupTaskList currentStep={currentStep} />
        {currentStep === SignupStep.Agreement && (
          <SignupAgreementView
            next={() => setCurrentStep(SignupStep.Information)}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
