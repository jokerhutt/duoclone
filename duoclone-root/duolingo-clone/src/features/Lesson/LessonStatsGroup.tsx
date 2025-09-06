import { LightningIcon } from "../../components/atoms/Icons/LightningIcon";
import { ScoreTargetIcon } from "../../components/atoms/Icons/ScoreTargetIcon";
import { LessonStatsCard } from "./LessonStatsCard";

type LessonStatsGroupProps = {
  totalScore: string | number;
  correctPercentage: string | number;
};

export function LessonStatsGroup({
  totalScore,
  correctPercentage,
}: LessonStatsGroupProps) {
  return (
    <div className="w-full flex gap-6 justify-center">
      <LessonStatsCard
        title="TOTAL XP"
        score={totalScore}
        scoreIcon={<LightningIcon />}
        mainColor="bg-duoGold"
        mainTextColor="text-duoGold"
      />

      <LessonStatsCard
        title="GOOD"
        score={correctPercentage}
        scoreSign="%"
        mainColor="bg-duoLightGreen"
        mainTextColor="text-duoLightGreen"
        scoreIcon={<ScoreTargetIcon />}
      />
    </div>
  );
}
