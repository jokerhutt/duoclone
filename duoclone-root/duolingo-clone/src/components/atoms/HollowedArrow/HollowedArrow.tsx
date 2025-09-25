
type HollowedArrowProps = {
    onClick?: () => void;
}

export function HollowedArrow ({onClick} : HollowedArrowProps) {
    return <div onClick={onClick} className="w-3 h-3 border-r-3 border-t-3 border-white rotate-45" /> 
}