import type { ReactNode } from "react";

type RectangleButtonProps = {
  color: string;
  children: ReactNode;
};

export function RectangleButton({ color, children }: RectangleButtonProps) {
  return (
    <div className="px-4 w-full sticky top-16 z-20">
      <button
        className={`w-full h-20 active:translate-y-[5px] active:shadow-none shadow-duoShadow ${color} rounded-2xl`}
      >
        {children}
      </button>
    </div>
  );
}
