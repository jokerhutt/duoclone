import { UserChestQuestsIcon } from "../../components/atoms/Icons/UserChestQuestsIcon";
import { UserFooterIcon } from "../../components/atoms/Icons/UserFooterIcon";
import { UserHomeIcon } from "../../components/atoms/Icons/UserHomeIcon";
import { UserLeagueIcon } from "../../components/atoms/Icons/UserLeagueIcon";
import { FooterButton } from "../../components/molecules/Footer/FooterButton";
import type { UserType } from "../../Types/UserType";

type MainNavigationButtonsProps = {
  currentUser: UserType;
};

export function MainNavigationButtons({
  currentUser,
}: MainNavigationButtonsProps) {
  return (
    <>
      <FooterButton path="/">
        <UserHomeIcon />
        <p className="hidden lg:flex text-white text-xl">Learn</p>
      </FooterButton>
      <FooterButton path="/leaderboard">
        <UserLeagueIcon />
        <p className="hidden lg:flex text-white text-xl">Leaderboard</p>
      </FooterButton>
      <FooterButton path="/quests">
        <UserChestQuestsIcon />
        <p className="hidden lg:flex text-white text-xl">Quests</p>
      </FooterButton>
      <FooterButton
        navigateOn={!!currentUser}
        path={currentUser ? `/profile/${currentUser.id}` : "#"}
      >
        <UserFooterIcon />
        <p className="hidden lg:flex text-white text-xl">Profile</p>
      </FooterButton>
    </>
  );
}
