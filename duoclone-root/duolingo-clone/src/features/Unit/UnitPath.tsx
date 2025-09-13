import { LessonButton } from "../Lesson/LessonButton";
import { SectionBreak } from "../../components/atoms/LineBreaks/SectionBreak";
import { useUnit } from "../../queries/useQuery/useUnit";
import { useLessonsByUnit } from "../../queries/useQuery/useLessonByUnit";
import { shouldInvert } from "../Lesson/types/pathOffets";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

type UnitPathProps = {
  id: number;
  index: number;
};

export function UnitPath({ id, index }: UnitPathProps) {
  const { data: unit, isLoading: unitLoading } = useUnit(id);
  const { data: unitLessons, isLoading: lessonsLoading } = useLessonsByUnit(
    id,
    1
  );
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (!unit) return;
    fetch(unit.animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, [unit]);

  const leftOffset = "mr-40";
  const rightOffset = "ml-40";

  const imageOffset = shouldInvert(index) ? leftOffset : rightOffset;

  if (unitLoading || lessonsLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full items-center mt-20 mb-20 space-y-6 relative">
        {unit && unitLessons && (
          <>
            {unitLessons.map((lesson, idx) => (
              <div className="w-auto py-1" key={idx}>
                <LessonButton idx={idx} id={lesson.id} courseIndex={index} unitColor={unit.color} unitOrderIndex={unit.orderIndex}/>
              </div>
            ))}
          </>
        )}
        <div className={`absolute mt-30 ${imageOffset}`}>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay
            className="w-50 h-50"
          />
        </div>
      </div>
      {unit && <SectionBreak lesson={unit.title} />}
    </>
  );
}
