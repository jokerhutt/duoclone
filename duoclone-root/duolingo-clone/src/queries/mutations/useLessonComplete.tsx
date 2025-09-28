import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LessonCompleteType } from "../../Types/LessonCompleteType";
import { API_PATH, SUBMIT_LESSON_COMPLETE } from "../../util/paths";
import { qk } from "../types/queryKeys";
import type { UserType } from "../../Types/UserType";

type useLessonCompleteParams = {
  lessonId: string;
  userId: number;
  courseId: number;
};

export const useLessonComplete = ({
  lessonId,
  userId,
  courseId,
}: useLessonCompleteParams) => {
  const queryClient = useQueryClient();

  return useMutation<LessonCompleteType>({
    mutationKey: ["lessonComplete", lessonId],
    mutationFn: async () => {
      const res = await fetch(SUBMIT_LESSON_COMPLETE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: Number(lessonId),
          userId: userId,
          courseId: courseId,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: qk.quests(userId) });
      queryClient.invalidateQueries({ queryKey: qk.monthlyChallenges(userId) });
      queryClient.setQueryData(qk.lesson(data.lessonId), data.updatedLesson);
      queryClient.setQueryData(
        qk.courseProgress(courseId),
        data.updatedUserCourseProgress
      );
      queryClient.setQueryData(
        qk.user(userId),
        (prev: UserType | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalScore: data.totalScore,
            streakLength: data.newStreakCount.newCount,
          };
        }
      );
      queryClient.setQueryData(
        qk.currentUser(),
        (prev: UserType | undefined) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalScore: data.totalScore,
            streakLength: data.newStreakCount.newCount,
          };
        }
      );
    },
  });
};
