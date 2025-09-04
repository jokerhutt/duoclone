import { useQuery } from "@tanstack/react-query";
import type { CourseProgressType } from "../Types/CourseProgressType";
import { GET_COURSE_PROGRESS } from "../util/paths";
import { qk } from "./queryKeys";

export function useCourseProgress(courseId: number, userId: number) {

  return useQuery({
    queryKey: qk.courseProgress(courseId),
    queryFn: () => fetchCourseProgress(courseId, userId),
  });
}

export async function fetchCourseProgress(courseId: number, userId: number): Promise<CourseProgressType> {
  const res = await fetch(GET_COURSE_PROGRESS(courseId, userId));
  if (!res.ok) throw new Error("Failed to fetch course progress");
  return (await res.json()) as CourseProgressType;
}