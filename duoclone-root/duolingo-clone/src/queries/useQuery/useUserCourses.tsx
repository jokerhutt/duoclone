import { useQuery } from "@tanstack/react-query";
import { GET_COURSE_IDS_FOR_USER as GET_COURSES_FOR_USER } from "../../constants/paths.ts";
import type { CourseType } from "../../Types/CourseType";

export function useUserCourses(userId?: number) {
  const enabled = typeof userId === 'number';
  return useQuery<CourseType[]>({
    queryKey: ['userCourses', userId] as const,
    queryFn: () => fetchUserCourses(userId as number),
    staleTime: 60_000,
    enabled,
  });
}

async function fetchUserCourses(userId: number): Promise<CourseType[]> {
  const res = await fetch(GET_COURSES_FOR_USER(userId));
  if (!res.ok) throw new Error("Failed to fetch courses for user");
  return res.json() as Promise<CourseType[]>;
}