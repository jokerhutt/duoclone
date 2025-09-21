import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";
import { ClozeExercise } from "./IndividualExercises/ClozeExercise";
import { ComposeSentenceExercise } from "./IndividualExercises/ComposeSentenceExercise";

type ExerciseComponentProps = {
  exercise: Exercise;
  currentSelectedOptions: ExerciseOption[];
  addOption: (option: ExerciseOption) => void;
  removeOption: (option: ExerciseOption) => void;
};

export function ExerciseComponent({
  exercise,
  currentSelectedOptions,
  addOption,
  removeOption,
}: ExerciseComponentProps) {
  console.log(JSON.stringify("EXERCISE IS: " + JSON.stringify(exercise)));

  const title =
    exercise.type != "CLOZE" ? "Fill in the blank" : "Translate this sentence";

  const toRender = () => {
    if (exercise.type == "CLOZE") {
      return (
        <ClozeExercise
          exercise={exercise}
          addOption={addOption}
          removeOption={removeOption}
          currentSelectedOptions={currentSelectedOptions}
        />
      );
    } else {
      return (
        <ComposeSentenceExercise
          exercise={exercise}
          addOption={addOption}
          removeOption={removeOption}
          currentSelectedOptions={currentSelectedOptions}
        />
      );
    }
  };

  return (
    <div className="w-full h-full px-2 gap-2 flex flex-col">
      <h1 className="text-white text-2xl">{title}</h1>
      {toRender()}
    </div>
  );
}
