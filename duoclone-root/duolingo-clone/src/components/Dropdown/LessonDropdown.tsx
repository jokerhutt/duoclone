import { DropdownMenu } from "radix-ui";

import * as Popover from "@radix-ui/react-popover";
import { cloneElement, useState } from "react";
import type { ReactElement } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type LessonDropdownProps = {
  lessonIndex: number;
  children: React.ReactElement<ButtonProps>;
};

export default function LessonDropdown({ lessonIndex, children }: LessonDropdownProps) {
  const [open, setOpen] = useState(false);



  return (
    <Popover.Root open={open} onOpenChange={setOpen}>

      <Popover.Anchor asChild>{children}</Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="center"
          sideOffset={12}
          avoidCollisions
          collisionPadding={10}
          className="z-50 min-w-40 rounded-xl border border-black/10 bg-white p-1 shadow-lg"
        >
          <div className="px-3 py-2 text-xs font-semibold text-neutral-800">
            Lesson {lessonIndex + 1}
          </div>

          <button className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-neutral-100">
            Start
          </button>
          <button className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm hover:bg-neutral-100">
            Practice
          </button>

          <Popover.Arrow className="fill-white drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}