import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { GET_COURSE_IDS_FOR_USER as GET_COURSES_FOR_USER } from "../../util/paths";
import type { CourseType } from "../../Types/CourseType";

export function useUserCourses(userId?: number) {
  const enabled = typeof userId === 'number';
  return useQuery<CourseType[]>({
    queryKey: ['userCourses', userId] as const,  // undefined is fine
    queryFn: () => fetchUserCourses(userId as number),
    enabled,
  });
}

async function fetchUserCourses(userId: number): Promise<CourseType[]> {
  const res = await fetch(GET_COURSES_FOR_USER(userId));
  if (!res.ok) throw new Error("Failed to fetch courses for user");
  return res.json() as Promise<CourseType[]>;
}