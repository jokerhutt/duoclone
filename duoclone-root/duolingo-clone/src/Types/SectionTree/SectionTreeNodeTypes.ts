import type { LessonType } from "../LessonType";
import type { SectionType } from "../SectionType"
import type { UnitType } from "../UnitType"

export type SectionTreeNode = {
    section: SectionType,
    units: UnitTreeNodes[]
}

export type UnitTreeNodes = {
    unit: UnitType;
    lessons: LessonType[]
}