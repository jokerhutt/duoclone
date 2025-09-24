import type { ReactNode } from "react"
import { useNavigate } from "react-router";

type FooterButtonProps = {
    children: React.ReactNode;
    path: string;
}

export function FooterButton ({children, path}: FooterButtonProps) {

    const navigate = useNavigate();

    const handleNavigation = () => {
        if (path.length > 0) {
            navigate(path);
        }
    }

    return (
        <div onClick={() => handleNavigation()}>
            {children}
        </div>
    )

}