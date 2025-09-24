import type { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
  padding?: string;
  height?: string;
  background?: string;
};

export function Header({
  children,
  padding = "px-2",
  height = "h-14",
  background = "bg-duoBackground"
}: HeaderProps) {
  return (
    <nav
      className={`w-full absolute ${background} flex justify-between z-10 items-center ${height} ${padding}`}
    >
      {children}
    </nav>
  );
}
