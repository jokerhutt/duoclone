import * as Popover from "@radix-ui/react-popover";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { LessonType } from "../../../Types/LessonType";
import { RectangleButton } from "../../atoms/Button/RectangleButton";
import { WideActionButton } from "../../../features/Common/WideActionButton";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

type LessonPopoverProps = {
  lessonIndex: number;
  triggerRef?: any;
  lesson: LessonType;
  open: boolean;
  lessonStatus: string;
  onOpenChange: (o: boolean) => void;
};

export default function LessonPopover({
  lessonIndex,
  lesson,
  triggerRef,
  open,
  lessonStatus,
  onOpenChange,
}: LessonPopoverProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const close = () => onOpenChange(false);

    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("wheel", close, { passive: true });
    window.addEventListener("touchmove", close, { passive: true });

    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("wheel", close);
      window.removeEventListener("touchmove", close);
    };
  }, [open, onOpenChange]);

  const bgColor = () => {
    if (lessonStatus == "PASSED" || lessonStatus == "CURRENT"
    ) {
        return "bg-duoGreen"
    } if (lessonStatus == "LOCKED") {
        return "bg-duoGrayLocked"
    }
  }

  const buttonText = () => {
    if (lessonStatus == "CURRENT") {
      return "START +15 XP"
    } else if (lessonStatus == "PASSED") {
      return "Practice +5 XP"
    }
    else {
      return "LOCKED"
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      {triggerRef && <Popover.Anchor virtualRef={triggerRef} />}

      <Popover.Portal>
        <Popover.Content
          asChild
          forceMount
          side="bottom"
          align="center"
          sideOffset={8}
          avoidCollisions
          collisionPadding={10}
        >
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="lp"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                style={{
                  transformOrigin:
                    "var(--radix-popover-content-transform-origin)",
                }}
                className={`z-50 min-w-60 rounded-xl ${bgColor()} px-4 py-2 pb-4 shadow-lg`}
              >
                <div className="flex w-full flex-col pb-4">
                  <div className=" text-lg font-bold text-duoSubText">
                    {lesson.title}
                  </div>
                  <button className="block w-full rounded-md text-duoSubText text-left text-sm">
                    Lesson 1 of 3
                  </button>
                </div>

                <WideActionButton
                  onSubmit={() => navigate(`/lessons/${lesson.id}/0`)}
                  isActive={true}
                  text={buttonText()}
                  activeColor="active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow/50 bg-white"
                  activeTextColor="text-duoGreen text-lg"
                />
                <Popover.Arrow className="fill-duoGreen" />
              </motion.div>
            )}
          </AnimatePresence>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
