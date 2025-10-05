import { useLocation, useNavigate } from "react-router";

type FooterButtonProps = {
  children: React.ReactNode;
  path: string;
  navigateOn?: boolean;
};

export function FooterButton({
  children,
  path,
  navigateOn = true,
}: FooterButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive =
    navigateOn && path && path === "/"
      ? location.pathname === "/"
      : location.pathname.includes(path);

  const style = isActive ? "border border-duoBlue/80 bg-duoBlue/8" : "";
  const baseStyle = "p-2 rounded-lg";
  const hoverStyle = isActive
    ? "hover:bg-duoBlue/20"
    : "hover:bg-duoGrayButtonText/30";

  const handleNavigation = () => {
    if (path && path.length > 0 && navigateOn) {
      navigate(path);
    }
  };

  return (
    <div
      className={`${baseStyle} ${style} ${hoverStyle} lg:flex hover:cursor-pointer lg:items-center lg:gap-6`}
      onClick={() => handleNavigation()}
    >
      {children}
    </div>
  );
}
