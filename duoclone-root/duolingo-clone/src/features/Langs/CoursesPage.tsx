import { useNavigate, useParams } from "react-router";
import { HollowedArrow } from "../../components/atoms/HollowedArrow/HollowedArrow";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useChangeCourse } from "../../queries/mutations/useChangeCourse";
import { useCourse } from "../../queries/useQuery/useCourse";
import type { CourseType } from "../../Types/CourseType";
import { useUserCourses } from "../../queries/useQuery/useUserCourses";

type CoursesPageProps = {
  title: string;
}

export function CoursesPage({title}: CoursesPageProps) {
  const navigate = useNavigate();
  const { data: allCourses } = useCourse("all");
  const { userId } = useParams<{ userId?: string }>();
  const numUserId = userId ? Number(userId) : undefined;
  const changeCourseMutation = useChangeCourse();
  const {data: userCourses} = useUserCourses(numUserId);
  const coursesArray = numUserId ? userCourses : allCourses as CourseType[]

  const handleSelectCourse = (courseId: number) => {
    changeCourseMutation.mutate(
      {newCourse: courseId },
      {
        onSuccess: () => {
          navigate(`/`);
        },
      }
    );
  };

  function capitalizeFirst(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const showBorder = (idx: number) => {
    if (!coursesArray) return "";
    if (idx != coursesArray.length - 1) {
      return "border-b border-b-duoGrayBorder";
    } else {
      return "";
    }
  };

  if (coursesArray)
    return (
      <div className="py-20 px-4">
        <ContentWidget title={title}>
          {coursesArray.map((course, idx) => (
            <div
              onClick={() => handleSelectCourse(course.id)}
              className={`w-full py-6 flex gap-4 ${showBorder(idx)}`}
            >
              <div className="w-30 flex items-center">
                <LanguageFlag icon={course.imgSrc} height="h-12" />
              </div>
              <div className="items-center flex">
                <p className="text-2xl text-white">
                  {capitalizeFirst(course.title)}
                </p>
              </div>
              <div className="flex w-full items-center justify-end">
                <HollowedArrow />
              </div>
            </div>
          ))}
        </ContentWidget>
      </div>
    );
}
