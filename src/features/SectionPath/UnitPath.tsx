import { LessonButton } from "./LessonButtons/LessonButton.tsx";
import { SectionBreak } from "../../components/atoms/LineBreaks/SectionBreak.tsx";
import { useLessonsByUnit } from "../../queries/useQuery/useLessonByUnit.tsx";
import { shouldInvert } from "../../constants/lessonPositionOffsets.ts";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import type { UnitType } from "../../Types/UnitType.ts";
import { useLottie } from "../../hooks/useLottie.tsx";

type UnitPathProps = {
  id: number;
  index: number;
  unit: UnitType;
  currentLessonButtonRef: any;
};

export function UnitPath({
  id,
  index,
  currentLessonButtonRef,
  unit,
}: UnitPathProps) {
  const { data: unitLessons, isLoading: lessonsLoading } = useLessonsByUnit(id);

  const animationData = useLottie(unit.animationPath);

  const leftImageOffset = "mr-40 lg:mr-60";
  const rightImageOffset = "ml-40 lg:ml-60";

  const imageOffset = shouldInvert(index) ? leftImageOffset : rightImageOffset;

  if (!unit || lessonsLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {unit && unit.orderIndex != 1 && <SectionBreak lesson={unit.title} />}
      <div className="flex flex-col w-full items-center lg:mb-0 mt-20 lg:mt-10 space-y-6 relative">
        {unit && unitLessons && (
          <>
            {unitLessons.map((lesson, idx) => (
              <div className="w-auto py-1" key={idx}>
                <LessonButton
                  currentLessonButtonRef={currentLessonButtonRef}
                  idx={idx}
                  id={lesson.id}
                  courseIndex={index}
                  unitColor={unit.color}
                  unitOrderIndex={unit.orderIndex}
                />
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
    </>
  );
}
