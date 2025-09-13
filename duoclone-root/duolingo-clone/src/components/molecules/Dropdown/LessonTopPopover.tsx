import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";

type LessonTopPopoverProps = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  triggerRef: any;
  lessonStatus: "CURRENT" | "JUMP"
  unitColor?: ColorType;
};

export function LessonTopPopover({
  open,
  onOpenChange,
  triggerRef,
  unitColor = "LOCKED",
  lessonStatus,
}: LessonTopPopoverProps) {

    const style = colorMap[unitColor];
    const text = lessonStatus == "CURRENT" ? "START" : "JUMP HERE?"

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      {triggerRef && <Popover.Anchor virtualRef={triggerRef} />}
      <Popover.Portal>
        <Popover.Content
          asChild
          forceMount
          side="top"
          align="center"
          sideOffset={-12}
          avoidCollisions={false}
        >
          {open && (
            <div
              key="lp"
              className={`rounded-xl bg-duoBackground border border-duoGrayBorder py-3 px-4 shadow-lg bob`}
            >
              <div
                className={`flex w-full text-xl text-center font-bold flex-col ${style.text}`}
              >
                {text}
              </div>

              <Popover.Arrow
                className={`fill-duoBackground`}
                width={16}
                height={12}
              />
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
