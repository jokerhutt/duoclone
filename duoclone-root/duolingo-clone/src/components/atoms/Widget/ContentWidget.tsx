type ContentWidgetProps = {
  title?: string;
  children: React.ReactNode;
};

export function ContentWidget({ title, children }: ContentWidgetProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {title && <h2 className="text-2xl text-white">{title}</h2>}
      <div className=" rounded-2xl px-4 border-2 h-full w-full border-duoGrayBorder">
        {children}
      </div>
    </div>
  );
}
