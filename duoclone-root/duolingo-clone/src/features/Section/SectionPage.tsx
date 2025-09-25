import { useEffect, useRef, useState } from "react";
import { LearnHeader } from "./LearnHeader";
import { UnitBanner } from "../Unit/UnitBanner";
import { UnitPath } from "../Unit/UnitPath";
import { useUnitObserver } from "../../util/UnitObserver";
import {
  useSectionTree,
  useSectionTreeData,
} from "../../queries/useQuery/useSectionTree";
import { motion, AnimatePresence } from "framer-motion";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { SpinnerPage } from "./SpinnerPage";
import { useCurrentUser } from "../../queries/useQuery/useCurrentUser";
import { useCurrentUnitStore } from "../../queries/useQuery/useCurrentUnitStore";
import { scrollToUnit } from "../../util/scrollUtils";

export function SectionPage() {
  const { isLoading, isError } = useSectionTree(1);
  const { units } = useSectionTreeData(1);
  const { data: courseProgress, isLoading: loadingProgress } =
    useCourseProgress(1, 1);

  const { currentUnit, setCurrentUnit } = useCurrentUnitStore();
  const unitRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser(1);

  useEffect(() => {
    scrollToUnit(currentUnit, units, scrollContainerRef, unitRefs);
  }, []);

  useUnitObserver(unitRefs, units ?? [], setCurrentUnit);

  if (isError) return <SpinnerPage color="border-red-400" />;
  if (loadingUser || isLoading || !units || !courseProgress)
    return <SpinnerPage />;

  return (
    <>
      <LearnHeader courseProgress={courseProgress} />
      <UnitBanner currentUnit={currentUnit} />
      <div
        ref={scrollContainerRef}
        className="w-full h-full mb-10 overflow-auto"
      >
        <AnimatePresence>
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              ref={(el) => {
                unitRefs.current[index] = el;
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
            >
              <UnitPath id={unit.id} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
