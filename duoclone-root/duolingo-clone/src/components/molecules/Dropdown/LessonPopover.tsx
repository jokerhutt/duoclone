import * as Popover from "@radix-ui/react-popover";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { LessonType } from "../../../Types/LessonType";
import { RectangleButton } from "../../atoms/Button/RectangleButton";
import { WideActionButton } from "../../../features/Common/WideActionButton";
import { useNavigate } from "react-router";

type LessonPopoverProps = {
  lessonIndex: number;
  triggerRef?: any; // keep it loose
  lesson: LessonType;
  open: boolean; // controlled
  onOpenChange: (o: boolean) => void;
};

export default function LessonPopover({
  lessonIndex,
  lesson,
  triggerRef,
  open,
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

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      {triggerRef && <Popover.Anchor virtualRef={triggerRef} />}

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          sideOffset={8}
          avoidCollisions
          collisionPadding={10}
          className="z-50 min-w-60 rounded-xl bg-duoGreen  px-4 py-2 pb-4 shadow-lg"
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
            text="START +15 XP"
            activeColor="active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow/50 bg-white"
            activeTextColor="text-duoGreen text-lg"
          />
          <Popover.Arrow className="fill-duoGreen" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
