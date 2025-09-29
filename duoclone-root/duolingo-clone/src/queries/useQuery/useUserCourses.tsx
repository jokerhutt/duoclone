import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { GET_COURSE_IDS_FOR_USER } from "../../util/paths";


export function useUserCourses(userId: number) {

    return useQuery({
        queryKey: qk.userCourses(userId),
        queryFn: () => fetchUserCourseIds(userId)
    })

}

export async function fetchUserCourseIds(
    userId: number
): Promise<number[]> {
  const res = await fetch(GET_COURSE_IDS_FOR_USER(userId));
  if (!res.ok) throw new Error("Failed to fetch course ids");
  return (await res.json()) as number[];
}