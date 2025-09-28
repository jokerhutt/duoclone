import { useNavigate } from "react-router";
import { UserChestQuestsIcon } from "../../components/atoms/Icons/UserChestQuestsIcon";
import { UserFooterIcon } from "../../components/atoms/Icons/UserFooterIcon";
import { UserHomeIcon } from "../../components/atoms/Icons/UserHomeIcon";
import { UserLeagueIcon } from "../../components/atoms/Icons/UserLeagueIcon";
import { UserPracticeIcon } from "../../components/atoms/Icons/UserPracticeIcon";
import { Footer } from "../../components/molecules/Footer/Footer";
import { FooterButton } from "../../components/molecules/Footer/FooterButton";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";

export function MainFooter() {
  const navigate = useNavigate();

  const {data: currentUser} = useCurrentUser();

  return (
    <Footer padding="px-6" height="h-20 border-t border-t-duoGrayBorder">
      <div className="w-full flex items-center justify-between">
        <FooterButton path="/">
          <UserHomeIcon />
        </FooterButton>
        <FooterButton path="/leaderboard">
          <UserLeagueIcon />
        </FooterButton>
        <FooterButton path="/quests">
          <UserChestQuestsIcon />
        </FooterButton>
        <FooterButton navigateOn={!!currentUser} path={currentUser ? `/profile/${currentUser.id}` : "#"}>
          <UserFooterIcon />
        </FooterButton>
      </div>
    </Footer>
  );
}
