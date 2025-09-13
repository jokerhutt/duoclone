import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";
import { ClozeExercise } from "./IndividualExercises/ClozeExercise";
import { ComposeSentenceExercise } from "./IndividualExercises/ComposeSentenceExercise";
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
    exercise.type != "CLOZE"
      ? "Fill in the blank"
      : "Translate this sentence";

  const toRender = () => {
    if (exercise.type != "CLOZE") {
      return <ClozeExercise exercise={exercise} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isSelectedOption={isSelectedOption}/>
    } else {
      return <ComposeSentenceExercise exercise={exercise} />
    }
  }

  return (
    <div className="w-full h-full px-2 gap-2 flex flex-col">
      <h1 className="text-white text-2xl">{title}</h1>
      {toRender()}
    </div>
  );
}
