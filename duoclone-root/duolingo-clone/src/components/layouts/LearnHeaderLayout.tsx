import { Outlet } from "react-router";
import { MainFooter } from "../../features/Common/MainFooter";
import { LearnHeader } from "../../features/Section/LearnHeader";
import { useUser } from "../../queries/useQuery/useUser";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { SpinnerPage } from "../../features/Section/SpinnerPage";

export function LearnHeaderLayout() {
    const {data: user} = useUser(1);
    const {data: userCourseProgress} = useCourseProgress(user?.currentCourseId, user?.id); 

    if (!user || !userCourseProgress) return <SpinnerPage/>

    return (
    <>
      <LearnHeader courseProgress={userCourseProgress}/>  
      <Outlet />
    </>
  );
}
