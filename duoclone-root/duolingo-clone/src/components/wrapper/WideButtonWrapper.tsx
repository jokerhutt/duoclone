import type { ReactNode } from "react";
import type { ColorType } from "../../Types/ColorType";

export function WideButtonWrapper({
  children,
  color,
}: {
  children: ReactNode;
  color: ColorType;
}) {
  return (
    <button
      className={`w-full h-20 active:translate-y-[5px] active:shadow-none shadow-duoShadow ${color} rounded-2xl`}
    >
      {children}
    </button>
  );
}
