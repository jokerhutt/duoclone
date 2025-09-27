import { useNavigate } from "react-router";
import { HollowedArrow } from "../../components/atoms/HollowedArrow/HollowedArrow";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useChangeCourse } from "../../queries/mutations/useChangeCourse";
import { useCourse } from "../../queries/useQuery/useCourse";
import { useUser } from "../../queries/useQuery/useUser";
import type { CourseType } from "../../Types/CourseType";

export function CoursesPage() {
  const navigate = useNavigate();

  const { data: user} = useUser(1);
  const { data: allCourses } = useCourse("all");

  const changeCourseMutation = useChangeCourse();
  const coursesArray = allCourses as CourseType[];

  const handleSelectCourse = (courseId: number) => {
    changeCourseMutation.mutate(
      { userId: user!.id, newCourse: courseId },
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
    if (idx != (coursesArray.length - 1)) {
      return "border-b border-b-duoGrayBorder"
    } else {
      return ""
    }
  }

  if (coursesArray)
    return (
        <div className="py-20 px-4">
          <ContentWidget title={"All Languages"}>
            {coursesArray.map((course, idx) => (
              <div
                onClick={() => handleSelectCourse(course.id)}
                className={`w-full py-6 flex gap-4 ${showBorder(idx)}`}
              >
                <div className="w-30 flex items-center">
                  <LanguageFlag icon={course.imgSrc} height="h-12" />
                </div>
                <div className="items-center flex">
                  <p className="text-2xl text-white">{capitalizeFirst(course.title)}</p>
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
