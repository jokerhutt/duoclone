import { useEffect, useRef } from "react";
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
import { useCurrentUnitStore } from "../../queries/useQuery/useCurrentUnitStore";
import { scrollToUnit } from "../../util/scrollUtils";
import { fadeInStagger } from "../../animations/FadeInAnimation";
import { ScrollToLessonButton } from "../Lesson/ScrollToCurrentButton";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";

export function SectionPage() {
  // -- REFS -- //
  const unitRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);

  // -- QUERY STATE -- //
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const { data: courseProgress } = useCourseProgress(
    currentUser?.currentCourseId
  );
  const { isLoading, isError } = useSectionTree(courseProgress?.sectionId);
  const { units } = useSectionTreeData(courseProgress?.sectionId);

  // -- THIS HANDLES THE BANNER CHANGING -- //
  const { currentUnit, setCurrentUnit } = useCurrentUnitStore();
  useUnitObserver(unitRefs, units ?? [], setCurrentUnit);

  // -- THIS MAKES IT SO THE PAGE STARTS AT THE LAST KNOWN POSITION -- //
  useEffect(() => {
    scrollToUnit(currentUnit, units, scrollContainerRef, unitRefs);
  }, []);

  if (isError) return <SpinnerPage color="border-red-400" />;
  if (loadingUser || isLoading || !units || !courseProgress)
    return <SpinnerPage color="border-blue-400"/>;

  return (
    <>
      <UnitBanner currentUnit={currentUnit} />
      <div
        ref={scrollContainerRef}
        className="w-full h-full pb-20 lg:pb-0 bg-duoBackground overscroll-contain lg:overflow-visible"
      >
        <AnimatePresence>
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              ref={(el) => {
                unitRefs.current[index] = el;
              }}
              {...fadeInStagger(index)}
            >
              <UnitPath
                unit={unit}
                id={unit.id}
                index={index}
                currentLessonButtonRef={currentLessonRef}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ScrollToLessonButton
        rootRef={scrollContainerRef}
        currentLessonRef={currentLessonRef}
      />
    </>
  );
}
