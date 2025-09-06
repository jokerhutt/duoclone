import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";
import { SelectionOptionButton } from "./Options/SelectionOptionButton";

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
        <SelectionOptionButton
          key={option.id}
          onClick={() => setSelectedOption(option)}
          isSelected={isSelectedOption(option)}
          text={option?.content}
        />
      ))}
    </div>
  );
}
