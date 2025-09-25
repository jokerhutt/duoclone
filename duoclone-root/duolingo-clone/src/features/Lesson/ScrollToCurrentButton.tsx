import { motion } from "framer-motion";

type ScrollToLessonButtonProps = {
  onClick: () => void;
  isVisible: boolean;
};

export function ScrollToLessonButton({ onClick, isVisible }: ScrollToLessonButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-24 right-4 bg-duoBlue rounded-full p-3 shadow-lg"
      onClick={onClick}
    >
      <img 
        src="https://d35aaqx5ub95lt.cloudfront.net/images/9a4bf74a58e4853c403307f5e4c4a27c.svg"
        className="w-6 h-6 rotate-90"
        alt="Scroll to current lesson"
      />
    </motion.button>
  );
}