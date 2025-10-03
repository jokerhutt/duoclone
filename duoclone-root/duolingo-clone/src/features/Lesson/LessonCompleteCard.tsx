import Lottie from "lottie-react";

type LessonCompleteCard = {
  title: string;
  lottieRef: any;
  animationData: any;
  onComplete: () => void;
  isPerfect: boolean;
};

export function LessonCompleteCard({
  title,
  lottieRef,
  animationData,
  isPerfect,
  onComplete,
}: LessonCompleteCard) {
  return (
    <div className="w-full flex flex-col items-center justify-end">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={onComplete}
        className="w-full h-80"
      />
      <div className="w-full flex flex-col items-center my-2">
        <p className="text-3xl text-duoGold">{title}</p>
        {isPerfect && (
          <p className="pt-2 text-lg font-light text-duoGrayBorder">
            You made no mistakes in this lesson
          </p>
        )}
      </div>
    </div>
  );
}
