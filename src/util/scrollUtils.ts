import type { RefObject } from "react";
import type { UnitType } from "../Types/UnitType";

export function scrollToUnit(
  currentUnit: UnitType | null,
  units: UnitType[] | undefined,
  scrollContainerRef: RefObject<HTMLDivElement | null>,
  unitRefs: RefObject<(HTMLElement | null)[]>
) {
  if (
    !currentUnit ||
    !units ||
    !scrollContainerRef ||
    !scrollContainerRef.current
  )
    return;

  const index = units.findIndex((unit) => unit.id === currentUnit.id);
  if (index === -1 || !unitRefs.current?.[index]) return;

  const element = unitRefs.current[index];
  const container = scrollContainerRef.current;
  if (!element) return;

  const elementTop = element.offsetTop;
  container.scrollTop = elementTop - container.clientHeight / 2;
}

export const scrollToCurrentLesson = (currentLessonRef: any) => {
  currentLessonRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
