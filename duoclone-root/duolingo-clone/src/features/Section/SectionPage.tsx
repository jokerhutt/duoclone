import { useEffect, useRef } from "react";
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
import { fadeInStagger } from "../../animations/FadeInAnimation";
import { ScrollToLessonButton } from "../Lesson/ScrollToCurrentButton";
import { useUser } from "../../queries/useQuery/useUser";

export function SectionPage() {
  // -- REFS -- //
  const unitRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);

  // -- QUERY STATE -- //
  const { data: currentUser } = useUser(1);
  const { data: courseProgress } = useCourseProgress(
    currentUser?.currentCourseId,
    currentUser?.id
  );
  const { isLoading, isError } = useSectionTree(courseProgress?.sectionId);
  const { units } = useSectionTreeData(courseProgress?.sectionId);
  const { isLoading: loadingUser } = useCurrentUser(1);

  // -- THIS HANDLES THE BANNER CHANGING -- //
  const { currentUnit, setCurrentUnit } = useCurrentUnitStore();
  useUnitObserver(unitRefs, units ?? [], setCurrentUnit);

  // -- THIS MAKES IT SO THE PAGE STARTS AT THE LAST KNOWN POSITION -- //
  useEffect(() => {
    scrollToUnit(currentUnit, units, scrollContainerRef, unitRefs);
  }, []);

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
              {...fadeInStagger(index)}
            >
              <UnitPath
                id={unit.id}
                index={index}
                currentLessonButtonRef={currentLessonRef}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <ScrollToLessonButton
          rootRef={scrollContainerRef}
          currentLessonRef={currentLessonRef}
        />
      </div>
    </>
  );
}
