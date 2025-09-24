export const API_URL = "http://localhost:";
export const API_PORT = "8080";
export const API_PREFIX = "/api";

export const API_PATH = API_URL + API_PORT + API_PREFIX;

// -------------------------------------------------------- //

export const GET_LESSONS_BY_UNIT = (unitId: number, userId: number) =>
  API_PATH + `/units/${unitId}/${userId}/lessons`;

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

export const GET_COURSE_PROGRESS = (courseId: number, userId: number) =>
  API_PATH + `/users/progress/${courseId}/${userId}`;

export const GET_USER_BY_ID = (userId: number) => API_PATH + `/users/${userId}`;

// -------------------------------------------------------- //

export const SUBMIT_LESSON_COMPLETE =
  API_PATH + `/lessons/completions/completedLesson`;
export const SUBMIT_EXERCISE_ATTEMPT = API_PATH + `/exercises/attempts/submit`;

export const GET_LESSONS_FROM_IDS = (lessonIds: string, userId: number) =>
  API_PATH + `/lessons/ids?${lessonIds}&userId=${userId}`;

export const GET_UNITS_FROM_IDS = (unitIds: string) =>
  API_PATH + `/units/ids?${unitIds}`;

export const GET_SECTIONS_FROM_IDS = (sectionIds: string) =>
  API_PATH + `/sections/ids?${sectionIds}`;

// -------------------------------------------------------- //

export const GET_BULK_TREE = (sectionId: number) =>
  API_PATH + `/sections/getBulk/${sectionId}/${1}`;

// -------------------------------------------------------- //

``;
