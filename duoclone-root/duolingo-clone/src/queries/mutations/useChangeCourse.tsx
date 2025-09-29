import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../../Types/UserType";
import { qk } from "../types/queryKeys";
import { CHANGE_COURSE } from "../../util/paths";
import type { CourseType } from "../../Types/CourseType";

interface ChangeCourseVariables {
  newCourse: number;
}

type CourseChangeType = {
  newUser: UserType;
  newCourses: CourseType[];
}

export function useChangeCourse() {
  const qc = useQueryClient();

  return useMutation<CourseChangeType, Error, ChangeCourseVariables>({
    mutationFn: async (variables: ChangeCourseVariables): Promise<CourseChangeType> => {
      const { newCourse } = variables;

      const res = await fetch(CHANGE_COURSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCourse }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to change course");

      const data = (await res.json()) as CourseChangeType;
      return data;
    },
    onSuccess: (updatedCourse: CourseChangeType) => {
      const updatedUser = updatedCourse.newUser;
      const newCourseList = updatedCourse.newCourses;
      qc.setQueryData(qk.user(updatedUser.id), updatedUser);
      qc.setQueryData(qk.currentUser(), updatedUser);
      qc.setQueryData(qk.userCourses(updatedUser.id), newCourseList)
    },
  });
}
