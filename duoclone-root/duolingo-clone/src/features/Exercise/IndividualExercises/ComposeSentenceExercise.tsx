import Lottie from "lottie-react";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { useEffect, useState } from "react";
import test from "../../../../public/lottie-animations/LILY_NEUTRAL_PROMPT.json";
import { OptionsList } from "../OptionsList";
import { SelectionOptionButton } from "../Options/SelectionOptionButton";

type ComponentSentenceExerciseProps = {
  exercise: Exercise;
};

export function ComposeSentenceExercise({
  exercise,
}: ComponentSentenceExerciseProps) {
  const [animationData, setAnimationData] = useState<any>(test);

  const [selectedOptions, setSelectedOptions] = useState<ExerciseOption | null>(
    null
  );

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

  const isSelectedOption = (option: ExerciseOption) => {
    return selectedOptions != null && selectedOptions.id == option.id;
  };

  const addOption = (option: ExerciseOption) => {
    setCurrentSelectedOptions((prev) => [...prev, option]);
  };

  const isInList = (option: ExerciseOption) => {
    return currentSelectedOptions.some((o) => o.id === option.id);
  };

  return (
    <div className="w-full h-full flex flex-col gap-12">
      <div className="w-full flex justify-start gap-4">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay
          className="w-30 h-auto"
        />
        <div className="mt-10 p-4 border h-fit border-duoGrayBorder rounded-xl">
          <p className="text-white font-light text-xl">
            My dog is very strong!
          </p>
        </div>
      </div>

      <div className="w-full border-b-4 min-h-13 max-h-13 border-b-duoGrayBorder">
        {currentSelectedOptions.map((option) => (
          <SelectionOptionButton
            key={option.id}
            text={option.content}
            isSelected={false}
            onClick={() => {
              setCurrentSelectedOptions((prev) =>
                prev.filter((o) => o.id != option.id)
              );
            }}
          />
        ))}

        {!!selectedOptions && (
          <SelectionOptionButton
            text={selectedOptions?.content ?? ""}
            isSelected={false}
            onClick={() => setSelectedOptions(null)}
          />
        )}
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <OptionsList
          exercise={exercise}
          isSelectedOption={isInList}
          setSelectedOption={addOption}
        />
      </div>
    </div>
  );
}
