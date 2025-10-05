type ContentWidgetProps = {
  title?: string | null;
  children: React.ReactNode;
  padding?: string;
};

export function ContentWidget({
  title,
  children,
  padding = "px-4",
}: ContentWidgetProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {title && <h2 className="text-2xl text-white">{title}</h2>}
      <div
        className={`rounded-2xl ${padding} border-2 h-full w-full border-duoGrayBorder`}
      >
        {children}
      </div>
    </div>
  );
}
