import { useNavigate } from "react-router";
import { CircleButton } from "../../components/atoms/Button/CircleButton";
import { getOffset } from "./types/pathOffets";
import { useLesson } from "../../queries/useQuery/useLesson";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";

type LessonButtonProps = {
  idx: number;
  id: number;
  courseIndex: number;
};

export function LessonButton({ idx, id, courseIndex }: LessonButtonProps) {
  const navigate = useNavigate();

  const { data: lesson, isLoading: lessonLoading } = useLesson(id);
  const { data: userCourseProgress, isLoading: userCourseProgressLoading } =
    useCourseProgress(1, 1);

  if (lessonLoading || userCourseProgressLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }




  const isPassed =
    lesson?.isPassed || userCourseProgress?.currentLessonId == lesson?.id;

  const buttonColor = !isPassed && lesson?.orderIndex != 1
    ? "bg-duoGrayLocked shadow-duoGrayLockedCircleShadow"
    : courseIndex % 6 == 0
    ? "bg-duoGreen shadow-duoGreenCircleShadow"
    : courseIndex % 6 == 1
    ? "bg-duoPink shadow-duoPinkCircleShadow"
    : "bg-duoBlue shadow-duoBlueCircleShadow ";


  const chooseLessonImage = () => {

    if (!lesson || !lesson.lessonType || !lesson.orderIndex || !lesson.id) return "";

    if (lesson.orderIndex == 1 && !isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/5e4203031e39fc43d94371565fd0d369.svg"
    }

    if (lesson.lessonType == "Lesson") {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg"
    }

    return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg"

  }


  const lessonImage: string = chooseLessonImage()


  if (!lesson) return null;

  const iconOpacity = isPassed || lesson?.orderIndex == 1 ? "" : "brightness-50";

  return (
    <CircleButton
      icon={lessonImage}
      mainColor={buttonColor}
      iconOpacity={iconOpacity}
      onClick={() => {
        if (isPassed) {
          navigate("/lessons/" + id + "/" + 0);
        }
      }}
      offset={getOffset(courseIndex, idx)}
    />
  );
}
