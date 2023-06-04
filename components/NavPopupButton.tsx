"use client";

import { AnimatePresence } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
import {
  FloatingOverlay,
  FloatingPortal,
  autoPlacement,
  autoUpdate,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import clsx from "clsx";

export const NavPopupButton: React.FC<
  React.PropsWithChildren<{
    buttonContent: React.ReactNode;
    fullHeight?: boolean;
  }>
> = ({ buttonContent, fullHeight, children }) => {
  const [open, setOpen] = React.useState(false);

  const { refs, floatingStyles, context, update } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      shift({ padding: 16 }),
      size({
        apply({ elements, availableHeight }) {
          elements.floating.style.maxHeight = `${Math.min(
            480,
            availableHeight
          )}px`;
        },
      }),
    ],
    placement: "bottom",
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  React.useEffect(() => {
    if (refs.reference.current && refs.floating.current) {
      const cleanup = autoUpdate(
        refs.reference.current,
        refs.floating.current,
        () => {
          console.log("update");
          update();
        }
      );

      return () => cleanup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.reference.current, refs.floating.current, update]);

  return (
    <>
      <button
        className="p-2 transition-colors hover:bg-black/10 rounded-full"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {buttonContent}
      </button>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay lockScroll style={{ zIndex: 99999 }}>
              <motion.div
                className={clsx(
                  "overflow-y-auto relative overflow-x-hidden w-full max-w-[360px] bg-white shadow-md rounded-xl ring-1 ring-black/10 origin-top",
                  {
                    "h-full": fullHeight,
                  }
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                }}
                {...getFloatingProps()}
              >
                {children}
              </motion.div>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
};
