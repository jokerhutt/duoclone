export const qk = {
  section: (id: number) => ["section", id] as const,
  unitsBySection: (id: number) => ["sections", id, "units"] as const,
  unit: (id: number) => ["unit", id] as const,
  lessonsByUnit: (id: number) => ["units", id, "lessons"] as const,
  lesson: (id: number) => ["lesson", id] as const,
  sectionTree: (id: number) => ["sectionTree", id] as const,
  courseProgress: (id: number) => ["courseProgress", id] as const,
  quests: (id: number) => ["quests", id] as const
};
