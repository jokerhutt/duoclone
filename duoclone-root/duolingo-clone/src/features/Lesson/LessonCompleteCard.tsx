import Lottie from "lottie-react";

type LessonCompleteCard = {
  title: string;
  lottieRef: any;
  animationData: any;
  onComplete: () => void;
};

export function LessonCompleteCard({
  title,
  lottieRef,
  animationData,
  onComplete,
}: LessonCompleteCard) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={onComplete}
        className="w-100 h-100"
      />
      <div className="w-full flex flex-col items-center my-10">
        <p className="text-3xl text-duoGold">{title}</p>
        <p className="py-6 text-lg font-light text-duoGrayBorder">
          You made no mistakes in this lesson
        </p>
      </div>
    </div>
  );
}
