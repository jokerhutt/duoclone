import { MainNavigationButtons } from "../../features/Common/MainNavigationButtons";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";

export function MainLeftSidebar() {

  const {data: currentUser} = useCurrentUser();  

  return (
    <aside className="hidden border-r border-duoGrayBorder p-2 lg:flex flex-col bg-duoBackground xl:w-80 lg:w-60 2xl:w-85"> 
    
        <div className="flex p-4 flex-col w-full h-full">
            <MainNavigationButtons currentUser={currentUser}/>
        </div>
    
    </aside>
  );
}
