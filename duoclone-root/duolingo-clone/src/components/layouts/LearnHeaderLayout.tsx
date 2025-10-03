import { Outlet } from "react-router";
import { LearnHeader } from "../../features/Section/LearnHeader";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { SpinnerPage } from "../../features/Section/SpinnerPage";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";

export function LearnHeaderLayout() {
    const {data: user} = useCurrentUser();
    const {data: userCourseProgress} = useCourseProgress(user?.currentCourseId); 

    if (!user || !userCourseProgress) return <SpinnerPage/>

    return (
    <div className="w-full h-full flex flex-col">
      <LearnHeader courseProgress={userCourseProgress}/>  
      <Outlet />
    </div>
  );
}
