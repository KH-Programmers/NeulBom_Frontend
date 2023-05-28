import React from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export const FormLabel: React.FC<
  React.PropsWithChildren<{
    control: React.ReactNode;
    name: string;
    horizontal?: boolean;
    className?: string;
  }>
> = ({ control, children, name, horizontal, className }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label
        className={clsx(
          "flex font-bold mt-2",
          {
            "flex-col items-start": !horizontal,
            "flex-row-reverse items-center": horizontal,
          },
          className
        )}
      >
        <div>{children}</div>
        {control}
      </label>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
