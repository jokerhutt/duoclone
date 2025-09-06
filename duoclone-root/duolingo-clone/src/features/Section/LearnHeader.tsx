import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { Header } from "../../components/molecules/Header/Header";

export function LearnHeader() {
  return (
    <Header>
      <LanguageFlag />
      <StreakIcon />
      <GemsIcon />
      <HeartIcon />
    </Header>
  );
}
