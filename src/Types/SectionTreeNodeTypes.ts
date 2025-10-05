import type { LessonType } from "./LessonType.ts";
import type { SectionType } from "./SectionType.ts";
import type { UnitType } from "./UnitType.ts";

export type SectionTreeNode = {
  section: SectionType;
  units: UnitTreeNode[];
};

export type UnitTreeNode = {
  unit: UnitType;
  lessons: LessonType[];
};
