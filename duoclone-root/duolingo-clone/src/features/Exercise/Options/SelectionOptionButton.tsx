type SelectedOptionButton = {
  key?: number;
  onClick: () => any;
  isSelected?: boolean;

  shadowColor?: string;
  borderColor?: string;
  paddingX?: string;
  paddingY?: string;
  selectedBgColor?: string;
  selectedTextColor?: string;
  disabledTextColor?: string;
  text?: string | null;
};

export function SelectionOptionButton({
  key,
  onClick,
  isSelected,
  text = "",
  shadowColor = "shadow-duoGrayBorderShadow",
  borderColor = "border-duoGrayBorder",
  paddingX = "px-3",
  paddingY = "py-2",
  selectedBgColor = "bg-duoGrayBorder",
  selectedTextColor = "text-duoGrayBorder",
  disabledTextColor = "text-white",
}: SelectedOptionButton) {
  return (
    <button
      key={key}
      onClick={onClick}
      className={`active:translate-y-[5px] active:shadow-none font-light border ${
        isSelected
          ? `${selectedBgColor} ${selectedTextColor}`
          : disabledTextColor
      } ${shadowColor} ${borderColor} rounded-2xl`}
    >
      <p className={`${paddingX} ${paddingY}`}>{text}</p>
    </button>
  );
}
