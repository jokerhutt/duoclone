import { useNavigate, useParams } from "react-router";
import { type LottieRefCurrentProps } from "lottie-react";

import { API_PATH } from "../../util/paths";
import { useEffect, useRef, useState } from "react";
import type { LessonCompleteType } from "../../Types/LessonCompleteType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../queries/types/queryKeys";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonStatsGroup } from "./LessonStatsGroup";
import { LessonCompleteCard } from "./LessonCompleteCard";

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    fetch("/lottie-animations/lessonEnd/EL_LUCY_DUO.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const navigate = useNavigate();

  const handleComplete = () => {
    if (!lottieRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);
    if (!totalFrames) return;

    console.log(totalFrames);

    const loopStart = totalFrames - 4;
    lottieRef.current.playSegments([loopStart, totalFrames], true);
  };

  const lessonCompleteMutation = useMutation<LessonCompleteType>({
    mutationFn: async () => {
      const res = await fetch(API_PATH + "/lessons/completedLesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: Number(lessonId),
          userId: 1,
          courseId: 1,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(qk.lesson(data.lessonId), data.updatedLesson);
      queryClient.setQueryData(
        qk.courseProgress(1),
        data.updatedUserCourseProgress
      );
    },
  });

  useEffect(() => {
    if (lessonId) lessonCompleteMutation.mutate();
  }, [lessonId]);

  if (lessonCompleteMutation.isError)
    return <p>Error: {lessonCompleteMutation.error.message}</p>;

  if (lessonCompleteMutation.isPending || !lessonCompleteMutation.data)
    return <SpinnerPage />;

  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-3 justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <LessonCompleteCard
          title={lessonCompleteMutation.data.message}
          lottieRef={lottieRef}
          animationData={animationData}
          onComplete={handleComplete}
        />
        <LessonStatsGroup
          totalScore={lessonCompleteMutation.data.totalScore}
          correctPercentage={lessonCompleteMutation.data.totalScore}
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
