import Lottie from "lottie-react";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { useEffect, useState } from "react";
import test from "../../../../public/lottie-animations/LILY_NEUTRAL_PROMPT.json";
import { OptionsList } from "../OptionsList";
import { SelectionOptionButton } from "../Options/SelectionOptionButton";

type ComponentSentenceExerciseProps = {
  exercise: Exercise;
  addOption: (option: ExerciseOption) => void;
  currentSelectedOptions: ExerciseOption[];
  removeOption: (option: ExerciseOption) => void;
};

const chunkBy = 30;

function chunkByChars(items: ExerciseOption[], limit = chunkBy) {
  const rows: ExerciseOption[][] = [];
  let row: ExerciseOption[] = [];
  let len = 0;
  for (const it of items) {
    if (it.content == null) continue;
    const w = it.content.length + (row.length ? 1 : 0);
    if (row.length && len + w > limit) {
      rows.push(row);
      row = [it];
      len = it.content.length;
    } else {
      row.push(it);
      len += w;
    }
  }
  if (row.length) rows.push(row);
  return rows;
}

export function ComposeSentenceExercise({
  exercise,
  currentSelectedOptions,
  addOption,
  removeOption,
}: ComponentSentenceExerciseProps) {

   const possibleAnimations = [
    "/lottie-animations/LILY_NEUTRAL_PROMPT.json",
    "/lottie-animations/EDDY_NEUTRAL_PROMPT.json",
    "/lottie-animations/BEAR_NEUTRAL_PROMPT.json",
    "/lottie-animations/LUCY_NEUTRAL_PROMPT.json"
  ]; 

  const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
    const random = Math.floor(Math.random() * possibleAnimations.length);
    const file = possibleAnimations[random];

    fetch(file)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);


  const plannedRows = Math.max(
    1,
    chunkByChars(exercise.options, chunkBy).length
  );

  const displayRows = chunkByChars(currentSelectedOptions, chunkBy);

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
          <p className="text-white font-light text-xl">{exercise.prompt}</p>
        </div>
      </div>

      <div>
        {Array.from({ length: plannedRows }).map((_, i) => {
          const row = displayRows[i] ?? [];
          return (
            <div
              key={i}
              className="w-full border-b-4 min-h-16 max-h-16 border-b-duoGrayBorder"
            >
              <div className="flex gap-2 py-2 min-h-10">
                {row.map((option) => (
                  <SelectionOptionButton
                    key={option.id}
                    text={option.content}
                    isSelected={false}
                    onClick={() => removeOption(option)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <OptionsList
          exercise={exercise}
          isSelectedOption={(option) =>
            currentSelectedOptions.some((opt) => opt.id === option.id)
          }
          addOption={addOption}
        />
      </div>
    </div>
  );
}
