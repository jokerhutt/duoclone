import { LessonButton } from "../Lesson/molecules/LessonButton";
import { SectionBreak } from "../../components/atoms/LineBreaks/SectionBreak";
import { useEffect, useState } from "react";
import { GET_LESSON_IDS, GET_LESSONS, GET_UNITS_FROM_IDS } from "../../util/paths";
import type { UnitType } from "../../Types/UnitType";
import type { LessonType } from "../../Types/LessonType";
import { parseIdsToRequestParam } from "../../util/pathParsers";

type UnitPathProps = {
  id: number;
  index: number;
};

export function UnitPath({ id, index }: UnitPathProps) {
  const [unitLessons, setUnitLessons] = useState<number[]>();

  const [unit, setUnit] = useState<UnitType | null>(null)

  useEffect(() => {
    console.log("Fetching")
    const ids = parseIdsToRequestParam("unitIds", [id])
    fetch(GET_UNITS_FROM_IDS(ids))
    .then(res => res.json())
    .then(data => setUnit(data[0]))
  }, [id])
 
  useEffect(() => {
    if (!unit) return;
    fetch(GET_LESSON_IDS(id))
      .then((res) => res.json())
      .then((data) => {
        console.log("LESSON UNIT IDS: " + JSON.stringify(data))
        setUnitLessons(data)});
  }, [unit]);

  return (
    <>
      <div className="flex flex-col w-full items-center mt-20 mb-20 space-y-6 relative">
        {unit && unitLessons && (
          <>
            {unitLessons.map((lesson, idx) => (
              <div className="w-auto py-2" key={idx}>
                <LessonButton
                  idx={idx}
                  id={lesson}
                  courseIndex={index}
                />
              </div>
            ))}
          </>
        )}
      </div>
      {unit && (
<SectionBreak lesson={unit.title} />
      )}
    </>
  );
}
