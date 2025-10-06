import { useNavigate, useParams } from "react-router";
import { useCourse } from "../queries/useQuery/useCourse";
import { useChangeCourse } from "../queries/mutations/useChangeCourse";
import { useUserCourses } from "../queries/useQuery/useUserCourses";
import type { CourseType } from "../Types/CourseType";
import { useCallback } from "react";

type useCoursesFlowReturn = {
  handleSelectCourse: (courseId: number) => void;
  coursesArray?: CourseType[];
};

export function useCoursesFlow(): useCoursesFlowReturn {
  const navigate = useNavigate();
  const { data: allCourses } = useCourse("all");
  const { userId } = useParams<{ userId?: string }>();
  const numUserId = userId ? Number(userId) : undefined;
  const changeCourseMutation = useChangeCourse();
  const { data: userCourses } = useUserCourses(numUserId);
  const coursesArray = numUserId ? userCourses : (allCourses as CourseType[]);

  const handleSelectCourse = useCallback(
    (courseId: number) => {
      changeCourseMutation.mutate(
        { newCourse: courseId },
        { onSuccess: () => navigate("/") }
      );
    },
    [changeCourseMutation, navigate]
  );

  return { handleSelectCourse, coursesArray };
}
