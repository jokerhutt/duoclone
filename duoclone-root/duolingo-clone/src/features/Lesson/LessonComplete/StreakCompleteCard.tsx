import Lottie from "lottie-react";
import { useEffect } from "react";

type StreakCompleteCardProps = {
  lottieRef: any;
  animationData: any;
  oldCount: number;
  newCount: number;
};

export function StreakCompleteCard({
  lottieRef,
  newCount,
  animationData,
}: StreakCompleteCardProps) {
  const completeLessonExtra = new Audio("/audio/completeLessonExtra.mp3");

  useEffect(() => {
    completeLessonExtra.play();
  }, []);

  return (
    <div className="w-full h-full flex gap-6 flex-col lg:pb-20 justify-center items-center pb-6">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay
        className="w-full h-80"
      />
      <h2 className="text-6xl text-duoOrange">{newCount}</h2>
      <h3 className="text-duoOrange text-3xl">Day Streak</h3>
    </div>
  );
}
