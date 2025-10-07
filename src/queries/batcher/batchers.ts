import { create, windowScheduler } from "@yornaath/batshit";
import { GET_LESSONS_FROM_IDS, GET_SECTIONS_FROM_IDS, GET_UNITS_FROM_IDS, GET_USERS_FROM_IDS } from "../../constants/paths";
import type { LessonType } from "../../Types/LessonType";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";
import type { UserType } from "../../Types/UserType";
import { makeIdBatcher } from "./batcherFactory";

export const sectionBatcher = makeIdBatcher<SectionType>({
  name: "section",
  getUrlFn: GET_SECTIONS_FROM_IDS,
  idsKey: "sectionIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const unitBatcher = makeIdBatcher<UnitType>({
  name: "unit",
  getUrlFn: GET_UNITS_FROM_IDS,
  idsKey: "unitIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const userBatcher = makeIdBatcher<UserType>({
  name: "user",
  getUrlFn: GET_USERS_FROM_IDS,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const lessonBatcher = makeIdBatcher<LessonType>({
  name: "lesson",
  getUrlFn: GET_LESSONS_FROM_IDS,
  idsKey: "lessonIds",
  scheduler: windowScheduler(10),
  createFn: create,
});