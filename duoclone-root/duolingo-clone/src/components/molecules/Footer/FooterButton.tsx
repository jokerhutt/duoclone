import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

type FooterButtonProps = {
  children: React.ReactNode;
  path: string;
};

export function FooterButton({ children, path }: FooterButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive =
    path === "/" ? location.pathname === "/" : location.pathname.includes(path);

  const style = isActive ? "border border-duoBlue/80 bg-duoBlue/8" : "";
  const baseStyle = "p-2 rounded-lg"

  const handleNavigation = () => {
    if (path.length > 0) {
      navigate(path);
    }
  };

  return <div className={`${baseStyle} ${style}`} onClick={() => handleNavigation()}>{children}</div>;
}
