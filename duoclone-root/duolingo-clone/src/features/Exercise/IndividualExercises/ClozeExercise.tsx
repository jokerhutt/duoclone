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
  const img =
    "https://d2pur3iezf4d1j.cloudfront.net/images/d109f51da8daee5c45d3f068fa1966e7";

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <div className="w-full flex justify-center h-36">
        <img src={img} />
      </div>
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
