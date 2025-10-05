import type { ReactNode } from "react";
import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInStagger } from "../../../effects/FadeInAnimation";

type RectangleButtonProps = {
  color?: string;
  unitColor?: ColorType;
  children: ReactNode;
  buttonWidth?: string;
};

export function RectangleButton({
  color,
  unitColor,
  children,
  buttonWidth = "w-full",
}: RectangleButtonProps) {
  const toDisplayColor = unitColor ? colorMap[unitColor] : colorMap["PINK"];
  const colorCSS = color
    ? color
    : `${toDisplayColor.text} ${toDisplayColor.shadow} ${toDisplayColor.bg}`;

  return (
    <AnimatePresence>
      <motion.div
        {...fadeInStagger(1)}
        className="px-4 w-full flex justify-center sticky top-16 lg:top-6 z-20"
      >
        <button
          className={`${buttonWidth} hover:cursor-pointer h-20 active:translate-y-[5px] active:shadow-none shadow-duoShadow ${colorCSS} rounded-2xl`}
        >
          {children}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
