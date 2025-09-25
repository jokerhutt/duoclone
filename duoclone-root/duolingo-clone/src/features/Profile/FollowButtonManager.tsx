import type { UserType } from "../../Types/UserType";
import { FollowButton } from "./FollowButton";
type FollowButtonManagerProps = {
  pageUser: UserType;
  show: boolean;
};
export function FollowButtonManager({
  pageUser,
  show,
}: FollowButtonManagerProps) {
  if (show) return <FollowButton pageUser={pageUser} />;
}
