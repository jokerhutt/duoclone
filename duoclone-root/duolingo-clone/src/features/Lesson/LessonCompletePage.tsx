import { useNavigate, useParams } from "react-router";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

import { API_PATH } from "../../util/paths";
import { useEffect, useRef, useState } from "react";
import type { LessonCompleteType } from "../../Types/LessonCompleteType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../queries/types/queryKeys";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";

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

  if (lessonCompleteMutation.isPending) return <SpinnerPage />;
  if (lessonCompleteMutation.isError)
    return <p>Error: {lessonCompleteMutation.error.message}</p>;

  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-3 justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay
          onComplete={handleComplete}
          className="w-100 h-100"
        />
        <div className="w-full flex flex-col items-center my-10">
          <p className="text-3xl text-duoGold">
            {lessonCompleteMutation.data?.message}
          </p>
          <p className="py-6 text-lg font-light text-duoGrayBorder">
            You made no mistakes in this lesson
          </p>
        </div>

        <div className="w-full flex gap-6 justify-center">
          <div className="bg-duoGold rounded-xl w-40 h-24 items-center flex flex-col p-1">
            <p className="text-duoBackground">TOTAL XP</p>
            <div className="bg-duoBackground w-full h-full rounded-xl flex items-center justify-center p-2">
              <p className="text-duoGold">
                {lessonCompleteMutation.data?.totalScore}
              </p>
            </div>
          </div>

          <div className="bg-duoGreen rounded-xl w-40 h-24 items-center flex flex-col p-1">
            <p className="text-duoBackground">AMAZING</p>
            <div className="bg-duoBackground w-full h-full rounded-xl flex items-center justify-center p-2">
              <p className="text-duoGreen">100%</p>
            </div>
          </div>
        </div>
      </div>
      <WideActionButton text="End Lesson" isActive={true} onSubmit={() => navigate("/")}/>
    </div>
  );
}
