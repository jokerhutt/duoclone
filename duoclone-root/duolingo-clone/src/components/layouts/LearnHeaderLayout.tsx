import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";
import { LearnHeader } from "../../features/Section/LearnHeader";
import { useUser } from "../../queries/useQuery/useUser";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { SpinnerPage } from "../../features/Section/SpinnerPage";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";

export function LearnHeaderLayout() {
    const {data: user} = useCurrentUser();
    const {data: userCourseProgress} = useCourseProgress(user?.currentCourseId, user?.id); 

    if (!user || !userCourseProgress) return <SpinnerPage/>

    return (
    <>
      <LearnHeader courseProgress={userCourseProgress}/>  
      <Outlet />
    </>
  );
}
