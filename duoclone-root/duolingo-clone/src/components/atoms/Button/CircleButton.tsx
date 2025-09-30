import { forwardRef, type RefObject } from "react";
import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";

type CircleButtonProps = {
  mainColor?: string;
  unitColor?: ColorType;
  shadowColor?: string;
  icon?: string;
  offset?: string;
  iconOpacity?: string;
  onClick: () => void;
  extraStyle?: string;
  currentLessonRef?: any;
  buttonRef?: any;
};

export function CircleButton({
  mainColor,
  unitColor,
  shadowColor,
  icon,
  offset = "",
  iconOpacity = "",
  extraStyle,
  onClick,
  currentLessonRef,
  buttonRef,
}: CircleButtonProps) {
  const toDisplayColor = unitColor ? colorMap[unitColor] : colorMap["GREEN"];
  const colorCSS = mainColor 
    ? mainColor
    : `${toDisplayColor.circleShadow} ${toDisplayColor.bg}`;
    
  return (
    <>
      <button
        ref={buttonRef ?? undefined}
        onClick={onClick}
        className={`h-14 w-16 hover:cursor-pointer rounded-full ${colorCSS} ${offset} ${extraStyle} active:translate-y-[5px] active:shadow-none flex items-center justify-center
        `}
        style={{ transition: "transform 0.2s" }}
      >
        <img
          ref={currentLessonRef}
          src={icon}
          className={`flex items-center ${iconOpacity} justify-center rounded-full`}
        />
      </button>
    </>
  );
}
