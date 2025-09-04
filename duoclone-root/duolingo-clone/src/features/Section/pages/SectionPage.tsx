import { useRef, useState } from "react";
import { LearnHeader } from "../../../components/Header/LearnHeader";
import { SectionHeader } from "../organisms/SectionHeader";
import { UnitPath } from "../../Unit/UnitPath";
import { useUnitObserver } from "../../../util/UnitObserver";
import {
  useSectionTree,
  useSectionTreeData,
} from "../../../queries/useQuery/useSectionTree";
import { useCourseProgress } from "../../../queries/useCourseProgress";
import { SpinnerPage } from "./SpinnerPage";

export function SectionPage() {
  const { isLoading, isError } = useSectionTree(1);
  const { units } = useSectionTreeData(1);
  const {data: courseProgress, isLoading: loadingProgress} = useCourseProgress(1, 1);
  

  const [currentUnit, setCurrentUnit] = useState("");
  const unitRefs = useRef<(HTMLElement | null)[]>([]);

  useUnitObserver(
    unitRefs,
    units ? units.map((u) => u.title) : [],
    setCurrentUnit
  );

  if (isError)
    return (
      <SpinnerPage color="border-red-400"/>

    );
  if (isLoading || !units || !courseProgress)
    return (
      <SpinnerPage/>
    );

  const headerTitle = currentUnit || units[0]?.title || "";

  return (
    <>
      <LearnHeader />
      <SectionHeader currentUnit={headerTitle} />
      <div className="w-full h-full overflow-auto">
        {units.map((unit, index) => (
          <div
            key={unit.id}
            ref={(el) => {
              unitRefs.current[index] = el;
            }}
          >
            <UnitPath id={unit.id} index={index} />
          </div>
        ))}
      </div>
    </>
  );
}
