import React from "react";
import { TbCheck, TbChecklist, TbPencil } from "react-icons/tb";
import { SignupStep } from "@/app/signup/types";
import { IconType } from "react-icons/lib";
import clsx from "clsx";

const Step: React.FC<
  React.PropsWithChildren<{
    noLine?: boolean;
    icon: IconType;
    step: SignupStep;
    currentStep: SignupStep;
  }>
> = ({ noLine, children, icon: Icon, step, currentStep }) => {
  const shouldHighlightLine = React.useMemo(
    () => step < currentStep,
    [step, currentStep]
  );
  const shouldHighlightIcon = React.useMemo(
    () => step <= currentStep,
    [step, currentStep]
  );

  return (
    <div className="relative flex flex-col items-center gap-2 flex-grow w-0">
      <div>
        {!noLine && (
          <div
            className={clsx("h-[4px] absolute left-1/2 top-[22px] ms-[24px]", {
              "bg-black/10": !shouldHighlightLine,
              "bg-primary": shouldHighlightLine,
            })}
            style={{ width: "calc(100% - 48px)" }}
          />
        )}
        <div
          className={clsx(
            "w-12 h-12 rounded-full flex justify-center items-center",
            {
              "bg-primary text-white": shouldHighlightIcon,
              "bg-black/20 text-black/40": !shouldHighlightIcon,
            }
          )}
        >
          <Icon size={24} />
        </div>
      </div>
      <div className="text-lg font-medium">{children}</div>
    </div>
  );
};

export const SignupTaskList: React.FC<{ currentStep: SignupStep }> = ({
  currentStep,
}) => {
  return (
    <div className="flex mt-4 w-full">
      <Step
        icon={TbChecklist}
        step={SignupStep.Agreement}
        currentStep={currentStep}
      >
        약관 동의
      </Step>
      <Step
        icon={TbPencil}
        step={SignupStep.Information}
        currentStep={currentStep}
      >
        회원 정보
      </Step>
      <Step
        icon={TbCheck}
        step={SignupStep.Done}
        currentStep={currentStep}
        noLine
      >
        가입 완료
      </Step>
    </div>
  );
};
