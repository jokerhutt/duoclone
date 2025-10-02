import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { OptionsList } from "../OptionsList";
import { ExercisePrompt } from "../Prompt/ExercisePrompt";

type ClozeExerciseProps = {
  exercise: Exercise;
  currentSelectedOptions: ExerciseOption[];
  addOption: (option: ExerciseOption) => void;
  removeOption: (option: ExerciseOption) => void;
};

export function ClozeExercise({
  exercise,
  currentSelectedOptions,
  addOption,
  removeOption,
}: ClozeExerciseProps) {

  return (
    <div className="w-full h-full flex flex-col gap-12 mt-10">
      <ExercisePrompt
        exercise={exercise}
        selectedOption={currentSelectedOptions[0]}
        setSelectedOption={() => removeOption(currentSelectedOptions[0])}
      />
      <div className="w-full h-full flex items-center justify-center">
        <OptionsList
          exercise={exercise}
          isSelectedOption={(option) =>
            currentSelectedOptions.some((opt) => opt.id === option.id)
          }
          canAddMore={currentSelectedOptions.length < 1}
          addOption={addOption}
        />
      </div>
    </div>
  );
}
