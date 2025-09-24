import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompleteType } from "../../Types/LessonCompleteType";
import { API_PATH, SUBMIT_LESSON_COMPLETE } from "../../util/paths";
import { qk } from "../types/queryKeys";
import type { UserType } from "../../Types/UserType";

type useLessonCompleteParams = {
  lessonId: string;
};

export const useLessonComplete = ({ lessonId }: useLessonCompleteParams) => {
  const queryClient = useQueryClient();

  return useMutation<LessonCompleteType>({
    mutationKey: ["lessonComplete", lessonId],
    mutationFn: async () => {
      const res = await fetch(SUBMIT_LESSON_COMPLETE, {
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
      queryClient.setQueryData(qk.user(1), (prev: UserType | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          totalScore: data.totalScore,
          streakLength: data.newStreakCount.newCount,
        };
      });
    },
  });
};
