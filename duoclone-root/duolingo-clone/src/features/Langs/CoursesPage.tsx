import { HollowedArrow } from "../../components/atoms/HollowedArrow/HollowedArrow";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useChangeCourse } from "../../queries/mutations/useChangeCourse";
import { useCourse } from "../../queries/useQuery/useCourse";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import type { CourseType } from "../../Types/CourseType";
import { LearnHeader } from "../Section/LearnHeader";

export function CoursesPage() {
  const { data: courseProgress } = useCourseProgress(1, 1);
  const { data: allCourses } = useCourse("all");
  const changeCourseMutation = useChangeCourse();
  const coursesArray = allCourses as CourseType[];


  const handleSelectCourse = (courseId: number) => {
    changeCourseMutation.mutate({ userId: 1, newCourse: courseId });
  };


  if (coursesArray && courseProgress)
    return (
      <div>
        <LearnHeader courseProgress={courseProgress} />
        <div className="py-20 px-4">
          <ContentWidget title={"All Languages"}>
            {coursesArray.map((course) => (
              <div onClick={() => handleSelectCourse(course.id)} className="w-full py-4 flex gap-2">
                <div className="w-30 flex items-center">
                  <LanguageFlag icon={course.imgSrc} height="h-12" />
                </div>
                <div className="items-center flex">
                  <p className="text-2xl text-white">{course.title}</p>
                </div>
                <div className="flex w-full items-center justify-end">
                  <HollowedArrow />
                </div>
              </div>
            ))}
          </ContentWidget>
        </div>
      </div>
    );
}
