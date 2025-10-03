type WideActionButtonProps = {
  onSubmit: () => void;
  isActive: boolean;
  text: string;
  activeColor?: string;
  isIncorrect?: boolean;
  activeText?: string;
  icon?: string;
  height?: string;
  disabledColor?: string;
  incorrectColor?: string;
  activeTextColor?: string;
  incorrectTextColor?: string;
  disabledTextColor?: string;
};

export function WideActionButton({
  onSubmit,
  isActive,
  text,
  activeText = "Continue",
  height = "h-14",
  icon,
  activeColor = "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen",
  disabledColor = "bg-duoGrayBorder",
  activeTextColor = "text-duoGrayButtonText",
  incorrectColor = "bg-duoRed",
  incorrectTextColor = "text-duoBackground",
  isIncorrect,
  disabledTextColor = activeTextColor,
}: WideActionButtonProps) {
  const textColor = isIncorrect ? incorrectTextColor : isActive ? activeTextColor : disabledTextColor;

  const textToDisplay = isActive || isIncorrect ? activeText : text;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onSubmit()
      }
      }
      className={`w-full hover:cursor-pointer rounded-2xl z-10 ${height} justify-center items-center ${
        isIncorrect ? incorrectColor : isActive ? activeColor : disabledColor
      } flex gap-2 text-xl`}
    >
      {icon && <img src={icon} className="h-4"/>}
      <p className={textColor}>{textToDisplay}</p>
    </div>
  );
}
