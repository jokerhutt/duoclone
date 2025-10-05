import type { Variants, Transition } from "framer-motion";

const popSpring: Transition = { type: "spring", stiffness: 800, damping: 25 };

export const bottomUpSpringAnimation: Variants = {
  initial: { y: 40, opacity: 0, scaleY: 0.9 },
  animate: { y: 0, opacity: 1, scaleY: 1, transition: popSpring },
  exit: { y: 20, opacity: 0, scaleY: 0.95 },
};
