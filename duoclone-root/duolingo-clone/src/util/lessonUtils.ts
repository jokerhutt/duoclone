export const checkButtonStyle = (isSelected: boolean) => {
  isSelected
    ? "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen"
    : "bg-duoGrayBorder";
};
