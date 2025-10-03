import { useEffect } from "react";
import type { RefObject } from "react";
import type { UnitType } from "../../Types/UnitType.ts";

export function useUnitObserver(
  unitRefs: RefObject<(HTMLElement | null)[]>,
  units: UnitType[],
  setCurrentUnit: (unit: UnitType) => void
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const topEntry = visibleEntries[0];

        const index =
          unitRefs.current?.findIndex((el) => el === topEntry.target) ?? -1;
        if (index !== -1) {
          setCurrentUnit(units[index]);   // 🔑 pass the full unit object
        }
      },
      { root: null, rootMargin: "-80px 0px 0px 0px", threshold: 0.5 }
    );

    unitRefs.current?.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      unitRefs.current?.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [unitRefs, units, setCurrentUnit]);
}