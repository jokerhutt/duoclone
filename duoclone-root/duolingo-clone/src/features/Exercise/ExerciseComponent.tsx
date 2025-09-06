import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";
import { SelectionOptionButton } from "./Options/SelectionOptionButton";
import { OptionsList } from "./OptionsList";
import { ExercisePrompt } from "./Prompt/ExercisePrompt";

type ExerciseComponentProps = {
  exercise: Exercise;
  selectedOption: ExerciseOption | null;
  setSelectedOption: (option: ExerciseOption | null) => void;
  isSelectedOption: (option: ExerciseOption) => boolean;
};

export function ExerciseComponent({
  exercise,
  selectedOption,
  setSelectedOption,
  isSelectedOption,
}: ExerciseComponentProps) {
  console.log(JSON.stringify("EXERCISE IS: " + JSON.stringify(exercise)));

  const title =
    exercise.type == "CLOZE"
      ? "Fill in the blank"
      : "Select the correct translation";
  const img =
    "https://d2pur3iezf4d1j.cloudfront.net/images/d109f51da8daee5c45d3f068fa1966e7";

  return (
    <div className="w-full h-full px-2 gap-6 flex flex-col">
      <h1 className="text-white text-2xl">{title}</h1>
      <div className="w-full h-full flex flex-col gap-12">
        <div className="w-full flex justify-center h-36">
          <img src={img} />
        </div>
        <ExercisePrompt
          exercise={exercise}
          selectedOption={selectedOption}
          setSelectedOption={() => setSelectedOption(null)}
        />
        <div className="w-full h-full flex items-center justify-center">
          <OptionsList
            exercise={exercise}
            isSelectedOption={isSelectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
    </div>
  );
}
