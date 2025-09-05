import { useState } from "react";
import { RectangleButton } from "../../components/atoms/Button/RectangleButton";
import type { Exercise, ExerciseOption } from "../../Types/ExerciseType";
import { OptionsList } from "./OptionsList";


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
        <p className="text-white text-xl leading-relaxed">
          {exercise.prompt.split("___").map((part, idx, arr) => {
            const longest = Math.max(
              ...exercise.options.map((o) => (o.content ? o.content.length : 0))
            );

            return (
              <span key={idx} className="font-light">
                {part}
                {idx < arr.length - 1 && (
                  <span
                    className="relative inline-block align-baseline top-[16px]"
                    style={{
                      width: `calc(${longest}ch + 2.5rem)`,
                      height: "1.5rem",
                    }}
                  >
                    <span className="absolute inset-x-0 bottom-0 border-b-2 border-gray-400"></span>

                    {selectedOption && (
                      <span className="absolute inset-x-0 bottom-2 flex items-center justify-center z-10 leading-none">
                        <button
                          onClick={() => setSelectedOption(null)}
                          className="border text-white shadow-duoGrayBorderShadow border-duoGrayBorder rounded-2xl"
                        >
                          <p className="px-3 py-2">{selectedOption.content}</p>
                        </button>
                      </span>
                    )}
                  </span>
                )}
              </span>
            );
          })}
        </p>
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
