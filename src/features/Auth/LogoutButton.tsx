import { LOGOUT } from "../../constants/paths.ts";
import { WideActionButton } from "../../components/atoms/Button/WideActionButton.tsx";

type LogoutButtonProps = {
  show?: boolean;
};

export function LogoutButton({ show }: LogoutButtonProps) {


  async function logout() {
    await fetch(LOGOUT, { method: "POST", credentials: "include" });
    window.location.href = "/auth";
  }

  if (show)
    return (
      <div className="w-full px-4 py-2 flex items-end h-full">
        <WideActionButton
          activeColor="bg-duoBackground border border-duoGrayLocked active:shadow-none active:translate-y-[5px] shadow-duoGrayLockedCircleShadow"
          activeTextColor="text-duoRed/80"
          activeText="Sign Out"
          onSubmit={() => logout()}
          isActive={true}
          text="Sign Out"
        />
      </div>
    );
}
