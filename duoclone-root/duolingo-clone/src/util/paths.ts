
export const API_URL = "http://localhost:"
export const API_PORT = "8080"
export const API_PREFIX = "/api"

export const API_PATH = API_URL + API_PORT + API_PREFIX

export const GET_LESSONS = (unitId: number) => API_PATH + `/units/${unitId}/lessons`;

//RETURN IDS AS ARRAY, USE FOR PARENTS
export const GET_UNIT_IDS = (sectionId: number) => API_PATH + `/sections/${sectionId}/units/ids`
export const GET_LESSON_IDS = (unitId: number) => API_PATH + `/units/${unitId}/lessons/ids`


//RETURN FULL OBJECTS AS ARRAYS, USE FOR BATCHER
export const GET_UNITS_FROM_IDS = (unitIds: string) => API_PATH + `/units/ids?${unitIds}`
export const GET_LESSONS_FROM_IDS = (lessonIds: string) => API_PATH + `/lessons/ids?${lessonIds}`

