import type { QuestCategory } from "./QuestCategory";

export type QuestType = {

    code: QuestCategory;
    progress: number;
    total: number;
    active: boolean;

}