import { UserChestQuestsIcon } from "../../components/atoms/Icons/UserChestQuestsIcon";
import { UserFooterIcon } from "../../components/atoms/Icons/UserFooterIcon";
import { UserHomeIcon } from "../../components/atoms/Icons/UserHomeIcon";
import { UserLeagueIcon } from "../../components/atoms/Icons/UserLeagueIcon";
import { FooterButton } from "../../components/molecules/Footer/FooterButton";
import type { UserType } from "../../Types/UserType";

type MainNavigationButtonsProps = {
    currentUser: UserType;
}

export function MainNavigationButtons({currentUser}: MainNavigationButtonsProps) {
  return (
    <>
      <FooterButton path="/">
        <UserHomeIcon />
      </FooterButton>
      <FooterButton path="/leaderboard">
        <UserLeagueIcon />
      </FooterButton>
      <FooterButton path="/quests">
        <UserChestQuestsIcon />
      </FooterButton>
      <FooterButton
        navigateOn={!!currentUser}
        path={currentUser ? `/profile/${currentUser.id}` : "#"}
      >
        <UserFooterIcon />
      </FooterButton>
    </>
  );
}
