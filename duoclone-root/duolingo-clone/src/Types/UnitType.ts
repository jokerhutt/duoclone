import type { ColorType } from "./ColorType";

export type UnitType = {

    id: number;
    title: string;
    sectionId: number;
    color: ColorType;
    position: number;

}


export const mockUnits: UnitType[] = [
  {
    id: 1,
    title: "Discuss a new job",
    sectionId: 3,
    color: "Green",
    position: 1,
  },
  {
    id: 2,
    title: "Talk about your habits",
    sectionId: 3,
    color: "Pink",
    position: 2,
  },
  {
    id: 3,
    title: "Pack for a vacation",
    sectionId: 3,
    color: "Blue",
    position: 3,
  },
    {
    id: 4,
    title: "Plan Dinner",
    sectionId: 3,
    color: "Green",
    position: 4,
  },
    {
    id: 5,
    title: "Use complex verbs",
    sectionId: 3,
    color: "Blue",
    position: 5,
  },
    {
    id: 6,
    title: "Argue with a roommate",
    sectionId: 3,
    color: "Pink",
    position: 6,
  },
];