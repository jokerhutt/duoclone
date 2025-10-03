import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType.ts";
import { SelectionOptionButton } from "./SelectionOptionButton.tsx";

type OptionsListProps = {
  exercise: Exercise;
  isSelectedOption: (option: ExerciseOption) => boolean;
  canAddMore?: boolean,
  addOption: (option: ExerciseOption) => void;
};

export function OptionsList({
  exercise,
  isSelectedOption,
  addOption,
  canAddMore = true
}: OptionsListProps) {

  const canAddOption = (option: ExerciseOption) => {

    if (!canAddMore) return;
    addOption(option);


  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {exercise.options.map((option) => (
        <SelectionOptionButton
          key={option.id}
          onClick={() => canAddOption(option)}
          isSelected={isSelectedOption(option)}
          text={option?.content}
        />
      ))}
    </div>
  );
}
