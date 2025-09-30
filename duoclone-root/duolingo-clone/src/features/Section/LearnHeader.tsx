import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { Header } from "../../components/molecules/Header/Header";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import { useNavigate } from "react-router";
import { useCourse } from "../../queries/useQuery/useCourse";
import type { CourseType } from "../../Types/CourseType";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { UserMainStats } from "../Common/UserMainStats";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {

  const { data: currentUser } = useCurrentUser();
  const { data: course} = useCourse(courseProgress.courseId);
  const courseObject = course as CourseType;

  const navigate = useNavigate();

  if (course && currentUser) return (
      <Header padding="px-4">
          <UserMainStats currentUser={currentUser} courseObject={courseObject} courseProgress={courseProgress}/>
      </Header>
  );
}
