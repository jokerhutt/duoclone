import { AnimatePresence, motion } from "framer-motion";
import { bottomUpSpringAnimation } from "../../animations/BottomUpSpringAnimation";
import type { ReactNode } from "react";

type BottomSheetProps = {
  isFullScreen?: boolean;
  isActive: boolean;
  onClose?: () => void;
  key?: string | number;
  children: ReactNode;
  bgColor?: string;
};

export function BottomSheet({
  isFullScreen,
  isActive,
  key,
  onClose,
  children,
  bgColor="bg-duoDarkGray"
}: BottomSheetProps) {
  const fullScreenStyle = "absolute";
  const normalStyle = "absolute";

  const style = isFullScreen ? fullScreenStyle : normalStyle;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div onClick={onClose} className={`${isFullScreen ? "fixed h-full w-full z-40 bg-black/20" : ""}`}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`${style} inset-x-0 bottom-0 ${bgColor}`}
            key={key}
            variants={bottomUpSpringAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
