import { useQuery } from "@tanstack/react-query";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import { GET_COURSE_PROGRESS } from "../../constants/paths.ts";
import { qk } from "../../constants/queryKeys.ts";

export function useCourseProgress(courseId: number | undefined) {
  return useQuery({
    queryKey:
      courseId != null
        ? qk.courseProgress(courseId)
        : (["courseProgress", "pending"] as const),
    queryFn: () => {
      if (courseId == null) {
        throw new Error("Missing courseId or userId");
      }
      return fetchCourseProgress(courseId);
    },
    staleTime: 60_000,
    enabled: courseId != null,
  });
}

export async function fetchCourseProgress(
  courseId: number
): Promise<CourseProgressType> {
  const res = await fetch(GET_COURSE_PROGRESS(courseId), {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch course progress");
  return (await res.json()) as CourseProgressType;
}
