import React from "react";
import clsx from "clsx";

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={clsx(className, "w-full h-8 focus:outline-none border-b-2")}
      {...props}
      ref={ref}
    />
  );
});

FormInput.displayName = "FormInput";
