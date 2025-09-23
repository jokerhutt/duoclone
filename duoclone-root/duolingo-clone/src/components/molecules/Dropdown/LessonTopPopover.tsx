import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";

type LessonTopPopoverProps = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  triggerRef: any;
  lessonStatus: "CURRENT" | "JUMP";
  unitColor?: ColorType;
  offset?: string;
};

export function LessonTopPopover({
  open,
  unitColor = "LOCKED",
  triggerRef,
  lessonStatus,
  offset,
}: LessonTopPopoverProps) {
  const style = colorMap[unitColor];
  const text = lessonStatus == "CURRENT" ? "START" : "JUMP HERE?";

  return (
    <>
      {open && (
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-16`} >
          <button
            className={`rounded-xl bg-duoBackground border ${offset} border-duoGrayBorder py-2 px-4 shadow-lg bob`}
          >
            <div
              className={`flex w-full text-lg text-center font-bold whitespace-nowrap ${style.text}`}
            >
              {text}
            </div>

            <div
              className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0
             border-l-8 border-r-8 border-t-8
             border-l-transparent border-r-transparent border-t-duoBackground"
            />
          </button>
        </div>
      )}
    </>
  );
}
