import { UserMainStats } from "../../features/Common/UserMainStats";
import { QuestListWidget } from "../../features/Quests/QuestListWidget";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { useCourse } from "../../queries/useQuery/useCourse";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import type { CourseType } from "../../Types/CourseType";
import { ContentWidget } from "../atoms/Widget/ContentWidget";

export function MainRightSideBar() {
  
  const { data: currentUser } = useCurrentUser();
  const courseId = currentUser?.currentCourseId;

  const { data: userCourseProgress } = useCourseProgress(courseId);
  const { data: course } = useCourse(currentUser.currentCourseId);;

  if (course && userCourseProgress)
    return (
      <aside className="hidden border-l border-duoGrayBorder lg:flex flex-col bg-duoBackground w-90 xl:w-110 2xl:w-180">
        <div className="flex py-6 px-8 gap-8 sticky top-0 flex-col w-full">
          <div className="w-full flex justify-between">
            <UserMainStats
              currentUser={currentUser}
              courseProgress={userCourseProgress}
              courseObject={course as CourseType}
            />
          </div>
          <ContentWidget padding="pl-4 pr-6" title={"Daily Quests"}>
            <QuestListWidget />
          </ContentWidget>
        </div>
      </aside>
    );
}
