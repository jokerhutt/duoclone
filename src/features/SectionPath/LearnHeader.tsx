import { Header } from "../../components/molecules/Header/Header";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import { useCourse } from "../../queries/useQuery/useCourse";
import type { CourseType } from "../../Types/CourseType";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { UserMainStats } from "../Common/UserMainStats";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {
  const { data: currentUser } = useCurrentUser();
  const { data: course } = useCourse(currentUser.currentCourseId);
  const courseObject = course as CourseType;

  if (course && currentUser)
    return (
      <Header padding="px-4">
        <UserMainStats
          currentUser={currentUser}
          courseObject={courseObject}
          courseProgress={courseProgress}
        />
      </Header>
    );
}
