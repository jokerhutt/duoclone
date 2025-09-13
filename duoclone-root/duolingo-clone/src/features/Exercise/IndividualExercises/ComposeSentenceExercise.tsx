import Lottie from "lottie-react";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { useEffect, useState } from "react";
import test from "../../../../public/lottie-animations/LILY_NEUTRAL_PROMPT.json";
import { OptionsList } from "../OptionsList";
import { SelectionOptionButton } from "../Options/SelectionOptionButton";

type ComponentSentenceExerciseProps = {
  exercise: Exercise;
};

function chunkByChars(items: ExerciseOption[], limit = 40) {
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
}: ComponentSentenceExerciseProps) {
  const [animationData, setAnimationData] = useState<any>(test);

  const [selectedOptions, setSelectedOptions] = useState<ExerciseOption | null>(
    null
  );

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

  const plannedRows = Math.max(
    1,
    chunkByChars(exercise.options, 40).length 
  );

  const displayRows = chunkByChars(
    selectedOptions
      ? [...currentSelectedOptions, selectedOptions]
      : currentSelectedOptions,
    40  );

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

      <div>
      {Array.from({ length: plannedRows }).map((_, i) => {
        const row = displayRows[i] ?? [];
        return (
          <div key={i} className="w-full border-b-4 min-h-16 max-h-16 border-b-duoGrayBorder">
            <div className="flex gap-2 py-2 min-h-10">
              {row.map((option) => (
                <SelectionOptionButton
                  key={option.id}
                  text={option.content}
                  isSelected={false}
                  onClick={() =>
                    setCurrentSelectedOptions((prev) =>
                      prev.filter((opt) => opt.id !== option.id)
                    )
                  }
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
          setSelectedOption={(option) =>
            setCurrentSelectedOptions((prev) =>
              prev.some((opt) => opt.id === option.id) ? prev : [...prev, option]
            )
          }
        />
      </div>
    </div>
  );
}
