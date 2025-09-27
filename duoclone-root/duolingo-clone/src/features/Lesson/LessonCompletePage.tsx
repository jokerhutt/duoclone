import { useNavigate, useParams } from "react-router";
import { type LottieRefCurrentProps } from "lottie-react";

import { useEffect, useRef, useState } from "react";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonStatsGroup } from "./LessonStatsGroup";
import { LessonCompleteCard } from "./LessonCompleteCard";
import { useLessonComplete } from "../../queries/mutations/useLessonComplete";
import { useUser } from "../../queries/useQuery/useUser";

export function LessonCompletePage() {

  const { lessonId } = useParams<{ lessonId: string }>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  const {data: user} = useUser(1);

  const possibleAnimations = [
    "/lottie-animations/EL_BEA_DUO.json",
    "/lottie-animations/EL_LIN_DUO.json",
    "/lottie-animations/EL_LUCY_DUO.json",
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * possibleAnimations.length);
    const file = possibleAnimations[random];

    fetch(file)
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
  const userIdForMutation: number = user?.id ?? 0;
  const courseIdForMutation: number = user?.currentCourseId ?? 0;

  const lessonCompleteMutation = useLessonComplete({
    lessonId: lessonIdForMutation,
    userId: userIdForMutation,
    courseId: courseIdForMutation
  });

  useEffect(() => {
    if (lessonId) lessonCompleteMutation.mutate();
  }, [lessonId]);

  if (lessonCompleteMutation.isError)
    return <p>Error: {lessonCompleteMutation.error.message}</p>;

  if (lessonCompleteMutation.isPending || !lessonCompleteMutation.data)
    return <SpinnerPage />;

  const totalScore = lessonCompleteMutation.data.totalScore;
  const accuracy = lessonCompleteMutation.data.accuracy;
  const title = accuracy < 100 ? "Lesson Complete!" : "Perfect Lesson!";
  const accuracyMessage = lessonCompleteMutation.data.message;

  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-3 justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LessonCompleteCard
          title={title}
          lottieRef={lottieRef}
          isPerfect={accuracy == 100}
          animationData={animationData}
          onComplete={handleComplete}
        />
        <LessonStatsGroup
          totalScore={totalScore}
          correctPercentage={accuracy}
          statsHeader={accuracyMessage}
        />
      </div>

      <WideActionButton
        text="End Lesson"
        isActive={true}
        activeColor="active:shadow-none active:translate-y-[5px] shadow-duoLightGreenShadow bg-duoLightGreen"
        onSubmit={() => navigate("/")}
      />
    </div>
  );
}
