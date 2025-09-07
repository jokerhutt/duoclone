import { forwardRef, type RefObject } from "react";

type CircleButtonProps = {
  mainColor: string;
  shadowColor?: string;
  icon?: string;
  offset?: string;
  iconOpacity?: string;
  onClick: () => void;
  extraStyle?: string;
  buttonRef?: any;
};

export function CircleButton({
  mainColor,
  shadowColor,
  icon,
  offset = "",
  iconOpacity = "",
  extraStyle,
  onClick,
  buttonRef,
}: CircleButtonProps) {
  return (
    <>
      <button
        ref={buttonRef ?? undefined}
        onClick={onClick}
        className={`h-14 w-16 rounded-full ${mainColor} ${offset} ${extraStyle} active:translate-y-[5px] active:shadow-none flex items-center justify-center
        `}
        style={{ transition: "transform 0.2s" }}
      >
        <img
          src={icon}
          className={`flex items-center ${iconOpacity} justify-center rounded-full`}
        />
      </button>
    </>
  );
}
