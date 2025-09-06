import { UserChestQuestsIcon } from "../../components/atoms/Icons/UserChestQuestsIcon";
import { UserFooterIcon } from "../../components/atoms/Icons/UserFooterIcon";
import { UserHomeIcon } from "../../components/atoms/Icons/UserHomeIcon";
import { UserLeagueIcon } from "../../components/atoms/Icons/UserLeagueIcon";
import { UserPracticeIcon } from "../../components/atoms/Icons/UserPracticeIcon";
import { Footer } from "../../components/molecules/Footer/Footer";

export function MainFooter() {
  return (
    <Footer padding="px-6" height="h-20 border-t border-t-duoGrayBorder">
      <div className="w-full flex items-center justify-between">
        <UserHomeIcon />
        <UserPracticeIcon />
        <UserLeagueIcon />
        <UserChestQuestsIcon />
        <UserFooterIcon />
      </div>
    </Footer>
  );
}
