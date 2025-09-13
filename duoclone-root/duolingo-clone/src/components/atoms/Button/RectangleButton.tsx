import type { ReactNode } from "react";
import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";

type RectangleButtonProps = {
  color?: string;
  unitColor?: ColorType;
  children: ReactNode;
};

export function RectangleButton({ color, unitColor, children }: RectangleButtonProps) {

  const toDisplayColor = unitColor ? colorMap[unitColor] : colorMap["PINK"]
  const colorCSS = color ? color : `${toDisplayColor.text} ${toDisplayColor.shadow} ${toDisplayColor.bg}`

  return (
    <div className="px-4 w-full sticky top-16 z-20">
      <button
        className={`w-full h-20 active:translate-y-[5px] active:shadow-none shadow-duoShadow ${colorCSS} rounded-2xl`}
      >
        {children}
      </button>
    </div>
  );
}
