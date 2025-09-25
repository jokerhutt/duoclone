import { motion } from "framer-motion";
import { scrollToCurrentLesson } from "../../util/scrollUtils";

type ScrollToLessonButtonProps = {
  isVisible: boolean;
  currentLessonRef: any;
};

export function ScrollToLessonButton({ isVisible, currentLessonRef }: ScrollToLessonButtonProps) {

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-24 right-4 bg-duoBlue rounded-full p-3 shadow-lg"
      onClick={() => scrollToCurrentLesson(currentLessonRef)}
    >
      <img 
        src="https://d35aaqx5ub95lt.cloudfront.net/images/9a4bf74a58e4853c403307f5e4c4a27c.svg"
        className="w-6 h-6 rotate-90"
        alt="Scroll to current lesson"
      />
    </motion.button>
  );
}