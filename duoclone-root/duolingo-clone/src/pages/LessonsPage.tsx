import { useRef, useState } from "react";
import { LearnHeader } from "../components/Header/LearnHeader";
import { SectionHeader } from "../components/Unit/SectionHeader";
import { UnitPath } from "../components/Unit/UnitPath";
import { useUnitObserver } from "../util/UnitObserver";

export function LessonsPage() {
  const unitNames: string[] = [
    "Discuss a new Job",
    "Talk about your Habits",
    "Pack for a Vacation",
  ];

  const lessons: string[] = [
    "Lesson",
    "Lesson",
    "Exercise",
    "Lesson",
    "Lesson",
    "Lesson",
    "Lesson",
  ];
  const lessonsTwo: string[] = [
    "Lesson",
    "Lesson",
    "Exercise",
    "Lesson",
    "Lesson",
    "Lesson",
    "Lesson",
  ];
  const lessonsThree: string[] = [
    "Lesson",
    "Lesson",
    "Exercise",
    "Lesson",
    "Lesson",
    "Lesson",
    "Lesson",
  ];

    const allLessons = [lessons, lessonsTwo, lessonsThree];

  const [currentUnit, setCurrentUnit] = useState(unitNames[0]);
  const unitRefs = useRef<(HTMLElement | null)[]>([]);

  useUnitObserver(unitRefs, unitNames, setCurrentUnit);

    return (
        <>
        <LearnHeader />
        <SectionHeader currentUnit={currentUnit} />
        <div className="w-full h-full overflow-auto">
          {allLessons.map((lesson, index) => (
            <div
              key={index}
              ref={(el) => {
                unitRefs.current[index] = el;
              }}
            >
              <UnitPath
                unitName={unitNames[index + 1]}
                lessons={allLessons[index]}
                index={index}
              />
            </div>
          ))}
        </div>
        </>
    ) 

}
