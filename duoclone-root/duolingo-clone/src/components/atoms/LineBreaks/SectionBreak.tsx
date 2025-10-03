type SectionBreakType = {
  lesson: string;
};

export function SectionBreak({ lesson }: SectionBreakType) {
  return (
    <div className="w-full flex items-center text-duoGrayText">
      <div className="w-full">
        <hr />
      </div>
      <p className="text-duoGrayText text-center px-2 whitespace-nowrap w-full text-xl font-bold">
        {lesson}
      </p>
      <div className="w-full">
        <hr />
      </div>
    </div>
  );
}
