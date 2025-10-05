import type { ColorType } from "../../../Types/ColorType.ts";
import { colorMap } from "../../../util/colorMap.ts";
import { PopoverArrow } from "./PopoverArrow.tsx";

type LessonTopPopoverProps = {
  open: boolean;
  lessonStatus: "CURRENT" | "JUMP";
  unitColor?: ColorType;
  offset?: string;
};

export function LessonTopPopover({
  open,
  unitColor = "LOCKED",
  lessonStatus,
  offset,
}: LessonTopPopoverProps) {
  const style = colorMap[unitColor];
  const text = lessonStatus == "CURRENT" ? "START" : "JUMP HERE?";

  return (
    <>
      {open && (
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-17`}>
          <button
            className={`rounded-xl bg-duoBackground border ${offset} border-duoGrayBorder py-2 px-4 shadow-lg bob`}
          >
            <div
              className={`flex w-full text-lg text-center font-bold whitespace-nowrap ${style.text}`}
            >
              {text}
            </div>
            <PopoverArrow />
          </button>
        </div>
      )}
    </>
  );
}
