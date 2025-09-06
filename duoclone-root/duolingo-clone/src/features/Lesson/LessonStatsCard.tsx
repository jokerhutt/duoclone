import type { ReactNode } from "react";

type LessonStatsCardProps = {
  title?: string;
  score?: string | number;
  scoreIcon?: ReactNode;
  scoreSign?: string;
  mainColor?: string;
  altBgColor?: string;
  mainTextColor?: string;
  altTextColor?: string;
};

export function LessonStatsCard({
  title,
  score,
  scoreSign,
  scoreIcon,
  mainColor = "bg-duoGreen",
  altBgColor = "bg-duoBackground",
  mainTextColor = "text-duoGreen",
  altTextColor = "text-duoBackground",
}: LessonStatsCardProps) {
  return (
    <div
      className={`${mainColor} rounded-xl w-40 h-24 items-center flex flex-col p-1`}
    >
      <p className={altTextColor}>{title}</p>
      <div
        className={`${altBgColor} w-full h-full rounded-xl flex items-center justify-center gap-3 p-2`}
      >
        {scoreIcon}
        <p className={`text-xl ${mainTextColor}`}>
          {score}
          {scoreSign}
        </p>
      </div>
    </div>
  );
}
