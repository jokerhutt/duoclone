import { MainNavigationButtons } from "../../features/Common/MainNavigationButtons";
import { QuestListWidget } from "../../features/Quests/QuestListWidget";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { ContentWidget } from "../atoms/Widget/ContentWidget";

export function MainLeftSidebar() {
  const { data: currentUser } = useCurrentUser();

  return (
    <aside className="hidden border-r border-duoGrayBorder lg:flex flex-col bg-duoBackground xl:w-80 lg:w-60 2xl:w-85">
      <div className="flex p-6 gap-4 sticky top-0 flex-col w-full">
        <MainNavigationButtons currentUser={currentUser} />

      </div>
    </aside>
  );
}
