import { useRef, useState } from "react";
import { LearnHeader } from "./LearnHeader";
import { UnitBanner } from "../Unit/UnitBanner";
import { UnitPath } from "../Unit/UnitPath";
import { useUnitObserver } from "../../util/UnitObserver";
import {
  useSectionTree,
  useSectionTreeData,
} from "../../queries/useQuery/useSectionTree";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { SpinnerPage } from "./SpinnerPage";
import { MainFooter } from "../Common/MainFooter";
import type { UnitType } from "../../Types/UnitType";
import { useCurrentUser } from "../../queries/useQuery/useCurrentUser";
import { useCurrentUnitStore } from "../../queries/useQuery/useCurrentUnitStore";

export function SectionPage() {
  const { isLoading, isError } = useSectionTree(1);
  const { units } = useSectionTreeData(1);
  const { data: courseProgress, isLoading: loadingProgress } =
    useCourseProgress(1, 1);

  const { currentUnit, setCurrentUnit } = useCurrentUnitStore();
  const unitRefs = useRef<(HTMLElement | null)[]>([]);

  const {data: currentUser, isLoading: loadingUser} = useCurrentUser(1);

  useUnitObserver(unitRefs, units ?? [], setCurrentUnit);

  if (isError) return <SpinnerPage color="border-red-400" />;
  if (loadingUser || isLoading || !units || !courseProgress) return <SpinnerPage />;

  return (
    <>
      <LearnHeader courseProgress={courseProgress} />
      <UnitBanner currentUnit={currentUnit} />
      <div className="w-full h-full mb-10 overflow-auto">
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
