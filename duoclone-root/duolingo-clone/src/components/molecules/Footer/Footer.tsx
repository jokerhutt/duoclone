import type { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
  padding?: string;
  height?: string;
};

export function Footer({
  children,
  padding = "px-2",
  height = "h-14",
}: FooterProps) {
  return (
    <footer
      className={`w-full absolute bottom-0 bg-duoBackground flex justify-between z-10 items-center ${height} ${padding}`}
    >
      {children}
    </footer>
  );
}
