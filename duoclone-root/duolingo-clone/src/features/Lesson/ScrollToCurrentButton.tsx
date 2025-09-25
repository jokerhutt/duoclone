import { motion } from "framer-motion";
import { scrollToCurrentLesson } from "../../util/scrollUtils";
import { ArrowIcon } from "../../components/atoms/Icons/ArrowIcon";
import { useIsElementVisible } from "../../util/useIsElementVisible";

type ScrollToLessonButtonProps = {
  rootRef: any;
  currentLessonRef: any;
};

export function ScrollToLessonButton({
  rootRef,
  currentLessonRef,
}: ScrollToLessonButtonProps) {

  const visibility = useIsElementVisible(currentLessonRef, {rootRef});
  const showDownArrow = visibility.position == "above"

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: !visibility.isVisible ? 1 : 0 }}
      className="fixed bottom-24 right-4 border-3 shadow bg-duoGrayLockedShadow shadow-duoDarkGray  border-duoGrayLocked rounded-2xl p-3"
      onClick={() => scrollToCurrentLesson(currentLessonRef)}
    >
      <ArrowIcon isUp={showDownArrow}/>
    </motion.button>
  );
}
