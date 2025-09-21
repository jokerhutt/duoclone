type WideActionButtonProps = {
  onSubmit: () => void;
  isActive: boolean;
  text: string;
  activeColor?: string;
  isIncorrect?: boolean;
  activeText?: string;

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
      className={`w-full rounded-2xl z-10 h-14 justify-center items-center ${
        isIncorrect ? incorrectColor : isActive ? activeColor : disabledColor
      } flex text-xl`}
    >
      <p className={textColor}>{textToDisplay}</p>
    </div>
  );
}
