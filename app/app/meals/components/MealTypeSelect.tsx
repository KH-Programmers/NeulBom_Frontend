import clsx from "clsx";
import React from "react";

export enum MealType {
  Lunch,
  Dinner,
}

const MealTypeButton: React.FC<
  React.PropsWithChildren<{ active: boolean; onClick: () => void }>
> = ({ children, active, onClick }) => {
  return (
    <button
      className={clsx(
        "px-[12px] rounded-full font-semibold relative transition-all",
        {
          "bg-white text-primary": active,
          "text-white": !active,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const MealTypeSelect: React.FC<{
  value: MealType;
  onChange: (value: MealType) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="bg-primary p-1 rounded-full flex gap-1">
      <MealTypeButton
        active={value === MealType.Lunch}
        onClick={() => onChange(MealType.Lunch)}
      >
        중식
      </MealTypeButton>
      <div className="ml-[-8px]">
        <MealTypeButton
          active={value === MealType.Dinner}
          onClick={() => onChange(MealType.Dinner)}
        >
          석식
        </MealTypeButton>
      </div>
    </div>
  );
};
