import * as Popover from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";

type LessonTopPopoverProps = {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    triggerRef: any;
}

export function LessonTopPopover({open, onOpenChange, triggerRef}: LessonTopPopoverProps) {

    return (
           <Popover.Root open={open} onOpenChange={onOpenChange}>
                  {triggerRef && <Popover.Anchor virtualRef={triggerRef} />}
      <Popover.Portal>
        <Popover.Content
          asChild
          forceMount
          side="top"
          align="center"
          sideOffset={8}
          avoidCollisions
          collisionPadding={10}
        >
          <AnimatePresence>
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
                
                className={`z-50 rounded-xl bg-duoBackground border border-duoGrayBorder py-1 px-3 shadow-lg`}
              >
                <div className={`flex w-full text-lg text-center font-bold flex-col text-duoSubText`}>
                    JUMP HERE?
                </div>
              
                <Popover.Arrow className={`fill-duoGrayBorder`} />
              </motion.div>
            )}
          </AnimatePresence>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root> 
    )

}