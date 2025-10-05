import { WideActionButton } from "../../../components/atoms/Button/WideActionButton.tsx";

type FollowButtonProps = {
  isFollowing: boolean;
  handleFollow: () => void;
};

export function FollowButton({ isFollowing, handleFollow }: FollowButtonProps) {
  const icon = isFollowing
    ? "https://d35aaqx5ub95lt.cloudfront.net/images/profile/4b39e57262e5c6f7d50d1eea429c071f.svg"
    : "https://d35aaqx5ub95lt.cloudfront.net/images/profile/91371d768cecbe046afdfa70cf1a017f.svg";

  return (
    <div className="w-4/5 py-2 px-4">
      <WideActionButton
        onSubmit={handleFollow}
        isActive={isFollowing}
        icon={icon}
        disabledTextColor={"text-duoBackground"}
        activeTextColor={"text-duoDarkGreen"}
        activeText={"Following"}
        disabledColor={"bg-duoBlue shadow-duoBlueCircleShadow"}
        activeColor={
          "bg-duoBackground border border-duoGrayLocked active:shadow-none active:translate-y-[5px] shadow-duoGrayLockedCircleShadow"
        }
        text={"Follow"}
        height="h-12"
      />
    </div>
  );
}
