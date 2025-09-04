export const API_URL = "http://localhost:";
export const API_PORT = "8080";
export const API_PREFIX = "/api";

export const API_PATH = API_URL + API_PORT + API_PREFIX;

// -------------------------------------------------------- //

export const GET_LESSONS_BY_UNIT = (unitId: number) =>
  API_PATH + `/units/${unitId}/lessons`;

export const GET_UNITS_BY_SECTION = (sectionId: number) =>
  API_PATH + `/sections/${sectionId}/units`;

export const GET_EXERCISES_BY_LESSON = (lessonId: number, userId: number) =>
  API_PATH + `/lessons/${lessonId}/${userId}/exercises`;

// -------------------------------------------------------- //

export const GET_LESSON_IDS = (unitId: number) =>
  API_PATH + `/units/${unitId}/lessons/ids`;

export const GET_UNIT_IDS = (sectionId: number) =>
  API_PATH + `/sections/${sectionId}/units/ids`;

// -------------------------------------------------------- //

export const GET_LESSONS_FROM_IDS = (lessonIds: string) =>
  API_PATH + `/lessons/ids?${lessonIds}`;

export const GET_UNITS_FROM_IDS = (unitIds: string) =>
  API_PATH + `/units/ids?${unitIds}`;

export const GET_SECTIONS_FROM_IDS = (sectionIds: string) =>
  API_PATH + `/sections/ids?${sectionIds}`;

// -------------------------------------------------------- //

export const GET_BULK_TREE = (sectionId: number) =>
  API_PATH + `/sections/getBulk/${sectionId}`;

// -------------------------------------------------------- //

export const SUBMIT_ATTEMPT = API_PATH + `/exercises/submit`;
``