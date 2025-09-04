import { useEffect, useRef, useState } from "react";
import { LearnHeader } from "../../../components/Header/LearnHeader";
import { SectionHeader } from "../organisms/SectionHeader";
import { UnitPath } from "../../Unit/UnitPath";
import { useUnitObserver } from "../../../util/UnitObserver";
import { GET_UNIT_IDS, GET_UNITS_FROM_IDS } from "../../../util/paths";
import { parseIdsToRequestParam } from "../../../util/pathParsers";
import {
  useSectionTree,
  useSectionTreeData,
} from "../../../queries/useQuery/useSectionTree";
import { useCourseProgress } from "../../../queries/useCourseProgress";

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
      <div className="w-full h-full flex items-center justify-center text-red-500">
        Failed to load.
      </div>
    );
  if (isLoading || !units || !courseProgress)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-duoGreen border-t-transparent" />
      </div>
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
