type CircleButtonProps = {
  mainColor: string;
  shadowColor?: string;
  icon?: string;
  offset?: string;
  iconOpacity?: string;
  onClick: () => void;
};

export function CircleButton({
  mainColor,
  shadowColor,
  icon,
  offset = "",
  iconOpacity = "",
  onClick,
}: CircleButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`h-14 w-16 rounded-full ${mainColor} ${offset} active:translate-y-[5px] active:shadow-none flex items-center justify-center
        `}
        style={{ transition: "transform 0.2s" }}
      >
        <img
          src={icon}
          className={`flex items-center ${iconOpacity} justify-center rounded-full`}
        />
      </button>
    </>
  );
}
