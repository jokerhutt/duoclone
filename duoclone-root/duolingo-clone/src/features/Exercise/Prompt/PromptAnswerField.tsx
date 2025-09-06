type PromptAnswerFieldProps = {
  show: boolean;
  widthCh: number;
  children: React.ReactNode;
};

export function PromptAnswerField({
  show,
  widthCh,
  children,
}: PromptAnswerFieldProps) {
  return (
    <span
      className="relative inline-block align-baseline top-4 h-6"
      style={{ width: `calc(${widthCh}ch + 2.5rem)` }}
    >
      <span className="absolute inset-x-0 bottom-0 border-b-2 border-gray-400" />
      {show && (
        <span className="absolute inset-x-0 bottom-2 flex items-center justify-center z-10 leading-none">
          {children}
        </span>
      )}
    </span>
  );
}
