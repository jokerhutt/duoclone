import type { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode;
    padding?: string;
    height?: string;
}

export function Header({children, padding = "px-2", height = "h-14"} : HeaderProps) {
  return (
    <nav className={`w-full absolute bg-duoBackground flex justify-between z-10 items-center ${height} ${padding}`}>
        {children}
    </nav>
  );
}
