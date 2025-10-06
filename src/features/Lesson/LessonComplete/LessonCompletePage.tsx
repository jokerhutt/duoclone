import { useParams } from "react-router";
import { SpinnerPage } from "../../../components/layouts/SpinnerPage.tsx";
import { WideActionButton } from "../../../components/atoms/Button/WideActionButton.tsx";
import { LessonStatsGroup } from "./LessonStatsGroup.tsx";
import { LessonCompleteCard } from "./LessonCompleteCard.tsx";
import { StreakCompleteCard } from "./StreakCompleteCard.tsx";
import {
  useLessonCompleteFlow,
  type LessonCompleteStats,
} from "../../../hooks/useLessonCompleteFlow.tsx";

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();

  const lessonCompleteData = useLessonCompleteFlow({ lessonId });

  const {
    lessonCompleteStats,
    animationData,
    streakAnimationData,
    hasStreakIncreased,
    handleContinueAction,
  } = lessonCompleteData;

  if (lessonCompleteData.isError) {
    return <p>Error: {lessonCompleteData.error?.message}</p>;
  }

  if (lessonCompleteData.isPending || !lessonCompleteStats || !animationData) {
    return <SpinnerPage />;
  }

  const { totalScore, accuracy, title, accuracyMessage, newCount, oldCount } =
    lessonCompleteStats as LessonCompleteStats;

  if (!hasStreakIncreased)
    return (
      <div className="w-full h-full flex items-center justify-between flex-col gap-6 pt-4 pb-4 px-3">
        <div className="w-full h-full flex gap-6 flex-col lg:pb-20 justify-center items-center pb-6">
          <LessonCompleteCard
            title={title}
            isPerfect={accuracy == 100}
            animationData={animationData}
          />
          <LessonStatsGroup
            totalScore={totalScore}
            correctPercentage={accuracy}
            statsHeader={accuracyMessage}
          />
        </div>
        <div className="lg:w-1/2 pb-4 w-full px-2 flex lg:justify-end">
          <WideActionButton
            text="End Lesson"
            isActive={true}
            activeColor="active:shadow-none active:translate-y-[5px] shadow-duoLightGreenShadow bg-duoLightGreen"
            onSubmit={() => handleContinueAction()}
          />
        </div>
      </div>
    );

  if (hasStreakIncreased && lessonCompleteStats)
    return (
      <div className="w-full h-full flex items-center justify-between flex-col gap-6 py-8 px-3">
        <StreakCompleteCard
          animationData={streakAnimationData}
          oldCount={oldCount}
          newCount={newCount}
        />
        <div className="lg:w-1/2 w-full px-2 flex lg:justify-end">
          <WideActionButton
            text="End Lesson"
            isActive={true}
            activeColor="active:shadow-none active:translate-y-[5px] shadow-duoLightGreenShadow bg-duoLightGreen"
            onSubmit={() => handleContinueAction()}
          />
        </div>
      </div>
    );
}
