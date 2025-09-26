import { ProgressBar } from "../../components/atoms/Bar/ProgressBar";

type LessonProgressBarProps = {
    completed: number;
    total: number;
}

export function LessonProgressBar({completed, total}: LessonProgressBarProps) {
  const bgcolor = "bg-duoGreen";
  return (
    <ProgressBar
      completed={completed}
      total={total}
      barColor={bgcolor}
    />
  );
}
