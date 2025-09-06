import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompleteType } from "../../Types/LessonCompleteType";
import { API_PATH } from "../../util/paths";
import { qk } from "../types/queryKeys";

type useLessonCompleteParams = {
  lessonId: string;
};

export const useLessonComplete = ({ lessonId }: useLessonCompleteParams) => {
  const queryClient = useQueryClient();

  return useMutation<LessonCompleteType>({
    mutationKey: ["lessonComplete", lessonId],
    mutationFn: async () => {
      const res = await fetch(API_PATH + "/lessons/completedLesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: Number(lessonId),
          userId: 1,
          courseId: 1,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(qk.lesson(data.lessonId), data.updatedLesson);
      queryClient.setQueryData(
        qk.courseProgress(1),
        data.updatedUserCourseProgress
      );
    },
  });
};
