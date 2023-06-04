import React from "react";
import { FloatingOverlay } from "@floating-ui/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { TbChevronLeft } from "react-icons/tb";

export const MobilePopupMenu: React.FC<
  React.PropsWithChildren<{
    title: React.ReactNode;
    open: boolean;
    onClose: () => void;
  }>
> = ({ title, open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <FloatingOverlay lockScroll style={{ zIndex: 99999 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white w-full h-full overflow-hidden flex flex-col"
          >
            <div className="flex p-2 border-b items-center gap-4">
              <button
                className="p-2 rounded-full hover:bg-black/10 transition-colors"
                onClick={onClose}
              >
                <TbChevronLeft size={24} />
              </button>
              <div className="text-xl font-semibold">{title}</div>
            </div>
            <div className="flex-grow h-0 overflow-y-auto">{children}</div>
          </motion.div>
        </FloatingOverlay>
      )}
    </AnimatePresence>
  );
};
