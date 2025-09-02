import { useState } from "react";
import { RectangleButton } from "../../../components/atoms/Button/RectangleButton";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";

type ExerciseComponentProps = {
  exercise: Exercise;
};

export function ExerciseComponent({ exercise }: ExerciseComponentProps) {
  console.log(JSON.stringify("EXERCISE IS: " + JSON.stringify(exercise)));

  const title =
    exercise.type == "CLOZE"
      ? "Fill in the blank"
      : "Select the correct translation";
  const img =
    "https://d2pur3iezf4d1j.cloudfront.net/images/d109f51da8daee5c45d3f068fa1966e7";

  const [selectedOption, setSelectedOption] = useState<ExerciseOption | null>(
    null
  );

  const isSelectedOption = (option: ExerciseOption) => {
    if (selectedOption != null && selectedOption.id == option.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full h-full px-3 gap-6 flex flex-col">
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
              <span key={idx}>
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
                          <p className="px-3 py-3">{selectedOption.content}</p>
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
          <div className="flex flex-wrap gap-2 justify-center">
            {exercise.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`active:translate-y-[5px] active:shadow-none border ${
                  isSelectedOption(option)
                    ? "bg-duoGrayBorder text-duoGrayBorder"
                    : "text-white"
                } shadow-duoGrayBorderShadow border-duoGrayBorder rounded-2xl`}
              >
                <p className="px-3 py-3">{option.content}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
