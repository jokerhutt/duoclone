import type { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
  padding?: string;
  height?: string;
  background?: string;
  showOnLg?: boolean;
};

export function Header({
  children,
  padding = "px-2",
  height = "h-14",
  background = "bg-duoBackground",
  showOnLg = false,
}: HeaderProps) {
  return (
    <nav
      className={`${!showOnLg ? "lg:hidden" : ""} w-full ${
        showOnLg ? "sticky top-0" : "absolute"
      } ${background} flex justify-between z-10 items-center ${height} ${padding}`}
    >
      {children}
    </nav>
  );
}
