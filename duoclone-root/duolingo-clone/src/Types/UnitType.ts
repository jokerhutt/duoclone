import type { ColorType } from "./ColorType";

export type UnitType = {
  id: number;
  title: string;
  sectionId: number;
  description: string;
  color?: ColorType;
  orderIndex: number;
};
