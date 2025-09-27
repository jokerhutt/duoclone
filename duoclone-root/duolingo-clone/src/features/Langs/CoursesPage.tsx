import { HollowedArrow } from "../../components/atoms/HollowedArrow/HollowedArrow";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { LearnHeader } from "../Section/LearnHeader";

export function CoursesPage() {
  const { data: courseProgress } = useCourseProgress(1, 1);

  if (courseProgress)
    return (
      <div>
        <LearnHeader courseProgress={courseProgress} />
        <div className="py-20 px-4">
          <ContentWidget title={"All Languages"}>
            <div className="w-full h-20 flex gap-2">
                <div className="w-30 flex items-center">
                    <LanguageFlag height="h-12"/>
                </div>
                <div className="items-center flex">
                    <p className="text-2xl text-white">French</p>
                </div>
                <div className="flex w-full items-center justify-end">
                    <HollowedArrow/>
                </div>
            </div>
          </ContentWidget>
        </div>
      </div>
    );
}
