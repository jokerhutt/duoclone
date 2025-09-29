import type { ColorType } from "../../Types/ColorType";

type UnitReviewButtonProps = {
    style: string;
    circleRef: any;
    handleButtonClick: () => void;
    currentLessonRef: any;
    unitOrderIndex: number;
}

export function UnitReviewButton({circleRef, currentLessonRef, handleButtonClick, unitOrderIndex, style}: UnitReviewButtonProps) {
  return (
    <button
      ref={circleRef ?? undefined}
      className="relative hover:cursor-pointer"
      onClick={handleButtonClick}
    >
      <p ref={currentLessonRef} className="absolute inset-0 flex items-center mb-2 justify-center text-2xl text-duoSubText font-bold">
        {unitOrderIndex}
      </p>
      <img className="h-20" src={style} />
    </button>
  );
}
