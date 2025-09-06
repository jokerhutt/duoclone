import type { LessonType } from "../LessonType";
import type { SectionType } from "../SectionType";
import type { UnitType } from "../UnitType";

export type SectionTreeNode = {
  section: SectionType;
  units: UnitTreeNode[];
};

export type UnitTreeNode = {
  unit: UnitType;
  lessons: LessonType[];
};
