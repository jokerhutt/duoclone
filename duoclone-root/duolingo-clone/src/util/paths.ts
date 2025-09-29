export const API_URL = "http://localhost:";
export const API_PORT = "8080";
export const API_PREFIX = "/api";

export const API_PATH = API_URL + API_PORT + API_PREFIX;

// -------------------------------------------------------- //

export const GET_LESSONS_BY_UNIT = (unitId: number) =>
  API_PATH + `/units/${unitId}/lessons`;

export const GET_UNITS_BY_SECTION = (sectionId: number) =>
  API_PATH + `/sections/${sectionId}/units`;

export const GET_EXERCISES_BY_LESSON = (lessonId: number) =>
  API_PATH + `/lessons/${lessonId}/exercises`;

// -------------------------------------------------------- //

export const GET_LESSON_IDS = (unitId: number) =>
  API_PATH + `/units/${unitId}/lessons/ids`;

export const GET_UNIT_IDS = (sectionId: number) =>
  API_PATH + `/sections/${sectionId}/units/ids`;

export const GET_COURSE_IDS_FOR_USER = (userId: number) => API_PATH + `/courses/get/${userId}`

// -------------------------------------------------------- //

export const GET_COURSE_PROGRESS = (courseId: number) =>
  API_PATH + `/users/progress/${courseId}`;

export const GET_QUESTS_BY_USER_ID = () =>
  API_PATH + `/quests/get`;

export const GET_MONTHLY_CHALLENGE_BY_USER_ID = () =>
  API_PATH + `/monthly-challenges/get`;

export const GET_FOLLOW_COUNTS_BY_USER_ID = (userId: number) =>
  API_PATH + `/follows/${userId}`;

// -------------------------------------------------------- //

export const SUBMIT_LESSON_COMPLETE = API_PATH + `/lessons/completions/submit`;
export const SUBMIT_EXERCISE_ATTEMPT = API_PATH + `/exercises/attempts/submit`;
export const FOLLOW_USER = API_PATH + `/follows/follow`;
export const UNFOLLOW_USER = API_PATH + `/follows/unfollow`;
export const CHANGE_COURSE = API_PATH + `/courses/change`;
export const GOOGLE_LOGIN = API_PATH + `/auth/google-login`;
export const UPDATE_AVATAR = API_PATH + `/users/update-avatar`;

export const GET_LESSONS_FROM_IDS = (lessonIds: string) =>
  API_PATH + `/lessons/ids?${lessonIds}`;

export const GET_USERS_FROM_IDS = (userIds: string) =>
  API_PATH + `/users/ids?${userIds}`;

export const GET_UNITS_FROM_IDS = (unitIds: string) =>
  API_PATH + `/units/ids?${unitIds}`;

export const GET_SECTIONS_FROM_IDS = (sectionIds: string) =>
  API_PATH + `/sections/ids?${sectionIds}`;

export const GET_ALL_COURSES = API_PATH + `/courses/all`;

export const GET_AUTH_ME = API_PATH + `/auth/me`;

export const LOGOUT = API_PATH + `/auth/logout`;

// -------------------------------------------------------- //

export const GET_BULK_TREE = (sectionId: number) =>
  API_PATH + `/sections/getBulk/${sectionId}`;

export const GET_AVATARS = API_PATH + `/users/avatars`;

export const GET_PAGINATED_LEADERBOARD = (
  cursor: string | null,
  limit: number
) =>
  API_PATH +
  `/leaderboard/paginated?limit=${limit}${
    cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""
  }`;

// -------------------------------------------------------- //
