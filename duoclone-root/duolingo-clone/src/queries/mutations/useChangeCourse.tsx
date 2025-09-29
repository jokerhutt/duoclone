import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../../Types/UserType";
import { qk } from "../types/queryKeys";
import { CHANGE_COURSE } from "../../util/paths";

interface ChangeCourseVariables {
  newCourse: number;
}

export function useChangeCourse() {
  const qc = useQueryClient();

  return useMutation<UserType, Error, ChangeCourseVariables>({
    mutationFn: async (variables: ChangeCourseVariables): Promise<UserType> => {
      const { newCourse } = variables;

      const res = await fetch(CHANGE_COURSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCourse }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to change course");

      const data = (await res.json()) as UserType;
      return data;
    },
    onSuccess: (updatedUser: UserType) => {
      qc.setQueryData(qk.user(updatedUser.id), updatedUser);
      qc.setQueryData(qk.currentUser(), updatedUser);
    },
  });
}
