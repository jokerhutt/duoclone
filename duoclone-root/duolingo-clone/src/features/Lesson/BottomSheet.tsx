import { AnimatePresence, motion } from "framer-motion";
import { bottomUpSpringAnimation } from "../../animations/BottomUpSpringAnimation";
import type { ReactNode } from "react";

type BottomSheetProps = {
  isFullScreen?: boolean;
  isActive: boolean
  key?: string | number;
  children: ReactNode;
};

export function BottomSheet({ isFullScreen, isActive, key, children }: BottomSheetProps) {


  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-duoDarkGray"
          key={key}
          variants={bottomUpSpringAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ transformOrigin: "bottom center" }}
        >
            {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
