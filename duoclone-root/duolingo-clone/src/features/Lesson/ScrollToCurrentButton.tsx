import { motion } from "framer-motion";
import { scrollToCurrentLesson } from "../../util/scrollUtils";
import { ArrowIcon } from "../../components/atoms/Icons/ArrowIcon";

type ScrollToLessonButtonProps = {
  isVisible: boolean;
  currentLessonRef: any;
};

export function ScrollToLessonButton({
  isVisible,
  currentLessonRef,
}: ScrollToLessonButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-24 right-4 border-3 shadow bg-duoGrayLockedShadow shadow-duoDarkGray  border-duoGrayLocked rounded-2xl p-3"
      onClick={() => scrollToCurrentLesson(currentLessonRef)}
    >
      <ArrowIcon/>
    </motion.button>
  );
}
