import { LightningIcon } from "../../../components/atoms/Icons/LightningIcon.tsx";
import { ScoreTargetIcon } from "../../../components/atoms/Icons/ScoreTargetIcon.tsx";
import { LessonStatsCard } from "./LessonStatsCard.tsx";

type LessonStatsGroupProps = {
  totalScore: string | number;
  correctPercentage: string | number;
  statsHeader: string;
};

export function LessonStatsGroup({
  totalScore,
  correctPercentage,
  statsHeader,
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
        title={statsHeader}
        score={correctPercentage}
        scoreSign="%"
        mainColor="bg-duoLightGreen"
        mainTextColor="text-duoLightGreen"
        scoreIcon={<ScoreTargetIcon />}
      />
    </div>
  );
}
