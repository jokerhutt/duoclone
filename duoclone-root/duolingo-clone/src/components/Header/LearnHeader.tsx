import { GemsIcon } from "../atoms/Icons/GemsIcon";
import { HeartIcon } from "../atoms/Icons/HeartIcon";
import { LanguageFlag } from "../atoms/Icons/LanguageFlag";
import { StreakIcon } from "../atoms/Icons/StreakIcon";
import { Header } from "./Header";

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
