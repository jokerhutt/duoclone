import { useEffect, useRef, useState } from "react";
import { LearnHeader } from "../../../components/Header/LearnHeader";
import { SectionHeader } from "../organisms/SectionHeader";
import { UnitPath } from "../../Unit/UnitPath";
import { useUnitObserver } from "../../../util/UnitObserver";
import { mockUnits } from "../../../Types/UnitType";
import { GET_UNIT_IDS } from "../../../util/paths";

const currentUnit = "";

export function SectionPage() {
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

  const [unitIds, setUnitIds] = useState([]);

  useEffect(() => {
    fetch(GET_UNIT_IDS(1))
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setUnitIds(data);
      });
  }, []);

  return (
    <>
      <LearnHeader />
      <SectionHeader currentUnit={currentUnit} />
      <div className="w-full h-full overflow-auto">
        {unitIds.length > 0 && (
          <>
            {unitIds.map((id, index) => (
              <div
                key={index}
                ref={(el) => {
                  unitRefs.current[index] = el;
                }}
              >
                <UnitPath id={id} index={index} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
