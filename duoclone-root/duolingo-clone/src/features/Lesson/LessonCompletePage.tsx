import { useNavigate, useParams } from "react-router";
import { type LottieRefCurrentProps } from "lottie-react";

import { useEffect, useRef, useState } from "react";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonStatsGroup } from "./LessonStatsGroup";
import { LessonCompleteCard } from "./LessonCompleteCard";
import { useLessonComplete } from "../../queries/mutations/useLessonComplete";

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/lottie-animations/lessonEnd/EL_LIN_DUO.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const navigate = useNavigate();

  const handleComplete = () => {
    if (!lottieRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);
    if (!totalFrames) return;

    const loopStart = totalFrames - 4;
    lottieRef.current.playSegments([loopStart, totalFrames], true);
  };

  const lessonIdForMutation: string = lessonId ?? "";

  const lessonCompleteMutation = useLessonComplete({
    lessonId: lessonIdForMutation,
  });

  useEffect(() => {
    if (lessonId) lessonCompleteMutation.mutate();
  }, [lessonId]);

  if (lessonCompleteMutation.isError)
    return <p>Error: {lessonCompleteMutation.error.message}</p>;

  if (lessonCompleteMutation.isPending || !lessonCompleteMutation.data)
    return <SpinnerPage />;

  const totalScore = lessonCompleteMutation.data.totalScore;
  const message = lessonCompleteMutation.data.message;

  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-3 justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LessonCompleteCard
          title={message}
          lottieRef={lottieRef}
          animationData={animationData}
          onComplete={handleComplete}
        />
        <LessonStatsGroup
          totalScore={totalScore}
          correctPercentage={totalScore}
        />
      </div>

      <WideActionButton
        text="End Lesson"
        isActive={true}
        onSubmit={() => navigate("/")}
      />
    </div>
  );
}
