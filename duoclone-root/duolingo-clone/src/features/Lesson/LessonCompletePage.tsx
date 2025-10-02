import { useNavigate, useParams } from "react-router";
import { type LottieRefCurrentProps } from "lottie-react";

import { useEffect, useRef, useState } from "react";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonStatsGroup } from "./LessonStatsGroup";
import { LessonCompleteCard } from "./LessonCompleteCard";
import { useLessonComplete } from "../../queries/mutations/useLessonComplete";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { StreakCompleteCard } from "./StreakCompleteCard";

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const lottieStreakRed = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [streakAnimationData, setStreakAnimationData] = useState<any>(null);

  const { data: user } = useCurrentUser();

  const [hasStreakIncreased, setHasStreakIncreased] = useState(false);

  const possibleAnimations = [
    "/lottie-animations/EL_BEA_DUO.json",
    "/lottie-animations/EL_LIN_DUO.json",
    "/lottie-animations/EL_LUCY_DUO.json",
  ];


  const completeSound = new Audio("/audio/completeLesson.mp3")

  useEffect(() => {
    const random = Math.floor(Math.random() * possibleAnimations.length);
    const file = possibleAnimations[random];

    fetch(file)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    const file = "/lottie-animations/STREAK_INCREMENT.json"

    fetch(file)
      .then((res) => res.json())
      .then((data) => setStreakAnimationData(data))
  }, [])

  const navigate = useNavigate();

  const handleComplete = () => {
    if (!lottieRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);
    if (!totalFrames) return;

    const loopStart = totalFrames - 4;
    lottieRef.current.playSegments([loopStart, totalFrames], true);
  };

  const lessonIdForMutation: string = lessonId ?? "";
  const courseIdForMutation: number = user?.currentCourseId ?? 0;

  const lessonCompleteMutation = useLessonComplete({
    lessonId: lessonIdForMutation,
    courseId: courseIdForMutation,
  });

  useEffect(() => {
    if (lessonId) {
      lessonCompleteMutation.mutate()
      completeSound.play();
    };
  }, [lessonId]);

  if (lessonCompleteMutation.isError)
    return <p>Error: {lessonCompleteMutation.error.message}</p>;

  if (lessonCompleteMutation.isPending || !lessonCompleteMutation.data)
    return <SpinnerPage />;

  const totalScore = lessonCompleteMutation.data.totalScore;
  const accuracy = lessonCompleteMutation.data.accuracy;
  const title = accuracy < 100 ? "Lesson Complete!" : "Perfect Lesson!";
  const accuracyMessage = lessonCompleteMutation.data.message;

  const handleNavigation = () => {

    if (!lessonCompleteMutation) return;

    const streakCount = lessonCompleteMutation.data.newStreakCount;

    if (!hasStreakIncreased && streakCount.oldCount != streakCount.newCount) {
      setHasStreakIncreased(true);
    } else {
      navigate("/")
    }

  }

  if (!hasStreakIncreased) return (
    <div className="w-full h-full flex items-center justify-between flex-col gap-6 py-8 px-3">
      <div className="w-full h-full flex gap-6 flex-col lg:pb-20 justify-center items-center pb-6">
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
      <div className="lg:w-1/2 w-full px-2 flex lg:justify-end">
        <WideActionButton
          text="End Lesson"
          isActive={true}
          activeColor="active:shadow-none active:translate-y-[5px] shadow-duoLightGreenShadow bg-duoLightGreen"
          onSubmit={() => handleNavigation()}
        />
      </div>
    </div>
  );

  if (hasStreakIncreased && lessonCompleteMutation) return (

    <div className="w-full h-full flex items-center justify-between flex-col gap-6 py-8 px-3">
      <StreakCompleteCard lottieRef={lottieStreakRed} animationData={streakAnimationData} oldCount={lessonCompleteMutation.data.newStreakCount.oldCount} newCount={lessonCompleteMutation.data.newStreakCount.newCount}/>
      <div className="lg:w-1/2 w-full px-2 flex lg:justify-end">
        <WideActionButton
          text="End Lesson"
          isActive={true}
          activeColor="active:shadow-none active:translate-y-[5px] shadow-duoLightGreenShadow bg-duoLightGreen"
          onSubmit={() => handleNavigation()}
        />
      </div>
    </div> 

  ) 

}
