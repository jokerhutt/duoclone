type SpinnerProps = {
  color?: string;
};

export function Spinner({ color = "border-duoGreen" }: SpinnerProps) {
  return (
    <div
      className={`h-16 w-16 animate-spin rounded-full border-4 ${color} border-t-transparent`}
    ></div>
  );
}
