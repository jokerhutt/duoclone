type WideActionButtonProps = {
  onSubmit: () => void;
  isActive: boolean;
  text: string;
  activeColor?: string;
  disabledColor?: string;
  activeTextColor?: string;
  disabledTextColor?: string;
};

export function WideActionButton({
  onSubmit,
  isActive,
  text,
  activeColor = "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen",
  disabledColor = "bg-duoGrayBorder",
  activeTextColor = "text-duoGrayButtonText",
  disabledTextColor = activeTextColor
}: WideActionButtonProps) {

  const textColor = isActive ? activeTextColor : disabledTextColor

  return (
    <div
      onClick={onSubmit}
      className={`w-full rounded-2xl h-14 justify-center items-center ${
        isActive ? activeColor : disabledColor
      } flex text-xl`}
    >
      <p className={textColor}>{text}</p>
    </div>
  );
}
