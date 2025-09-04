import { useParams } from "react-router";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

import { API_PATH, SUBMIT_ATTEMPT } from "../../../util/paths";
import { useEffect, useRef, useState } from "react";
import type { LessonCompleteType } from "../../../Types/LessonCompleteType";

export function LessonCompletePage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/lottie-animations/lessonEnd/EL_LUCY_DUO.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  // After animation finishes, restart from a chosen frame range
  const handleComplete = () => {
    if (!lottieRef.current) return;

    const totalFrames = lottieRef.current.getDuration(true);
    if (!totalFrames) return; // guard against undefined

    console.log(totalFrames)

    const loopStart = totalFrames - 4; // last 30 frames
    lottieRef.current.playSegments([loopStart, totalFrames], true);
  };

    async function GetLessonComplete() {
      const data = {
        lessonId: lessonId,
        userId: 1,
        courseId: 1,
      };

      try {
        const response = await fetch(API_PATH + "/lessons/completedLesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonCompleteRequest: data }),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: LessonCompleteType = await response.json();
        console.log(JSON.stringify(response));
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="w-full h-full flex items-center flex-col py-8 px-3 justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false} // let it play once first
          autoplay
          onComplete={handleComplete}
          className="w-100 h-100"
        />
        <div className="w-full flex flex-col items-center my-10">
          <p className="text-3xl text-duoGold">Perfect Lesson!</p>
          <p className="py-6 text-lg font-light text-duoGrayBorder">
            You made no mistakes in this lesson
          </p>
        </div>

        <div className="w-full flex gap-6 justify-center">
          <div className="bg-duoGold rounded-xl w-40 h-24 items-center flex flex-col p-1">
            <p className="text-duoBackground">TOTAL XP</p>
            <div className="bg-duoBackground w-full h-full rounded-xl flex items-center justify-center p-2">
              <p className="text-duoGold">10</p>
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
      <div
        className={`w-full rounded-2xl h-14 justify-center items-center active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen
          )} flex text-xl`}
      >
        <p className="text-duoGrayButtonText">End Lesson</p>
      </div>
    </div>
  );
}
