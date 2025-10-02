
export const fadeInStagger = (index: number) => ({
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: {
    duration: 0.5,
    delay: index * 0.05,
  },
});
