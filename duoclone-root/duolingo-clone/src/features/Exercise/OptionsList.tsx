import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";


type OptionsListProps = {
  exercise: Exercise;
  isSelectedOption: (option: ExerciseOption) => boolean;
  setSelectedOption: (option: ExerciseOption) => void;
};

export function OptionsList({
  exercise,
  isSelectedOption,
  setSelectedOption,
}: OptionsListProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {exercise.options.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelectedOption(option)}
          className={`active:translate-y-[5px] active:shadow-none font-light border ${
            isSelectedOption(option)
              ? "bg-duoGrayBorder text-duoGrayBorder"
              : "text-white"
          } shadow-duoGrayBorderShadow border-duoGrayBorder rounded-2xl`}
        >
          <p className="px-3 py-2">{option.content}</p>
        </button>
      ))}
    </div>
  );
}
