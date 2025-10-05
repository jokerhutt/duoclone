export type QuestCategory = "STREAK" | "ACCURACY" | "PERFECT";

export type QuestMetaData = {
  title: string;
  description: string;
  iconUrl: string;
};

export const QUEST_METADATA: Record<QuestCategory, QuestMetaData> = {
  STREAK: {
    title: "Extend your streak",
    description: "Extend your streak.",
    iconUrl: "/icon-images/QUEST_STREAK.svg",
  },
  ACCURACY: {
    title: "High accuracy",
    description: "Score 90% or higher in 2 lessons.",
    iconUrl: "/icon-images/QUEST_ACCURACY.svg",
  },
  PERFECT: {
    title: "Perfect lesson",
    description: "Get 1 perfect lesson.",
    iconUrl: "/icon-images/QUEST_PERFECT.svg",
  },
};
