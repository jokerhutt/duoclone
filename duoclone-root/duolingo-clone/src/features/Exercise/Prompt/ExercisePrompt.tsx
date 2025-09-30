import { Fragment, useMemo } from "react";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { SelectionOptionButton } from "../Options/SelectionOptionButton";
import { PromptAnswerField } from "./PromptAnswerField";

type ExercisePrompt = {
  exercise: Exercise;
  selectedOption: ExerciseOption | null;
  setSelectedOption: () => any;
};

export function ExercisePrompt({
  exercise,
  selectedOption,
  setSelectedOption,
}: ExercisePrompt) {
  const parts = useMemo(() => exercise.prompt.split("___"), [exercise.prompt]);
  const longest = useMemo(
    () =>
      Math.max(
        0,
        ...exercise.options.map((o) => (o.content ? o.content.length : 0))
      ),
    [exercise.options]
  );

  return (
    <p className="text-white text-xl leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <PromptAnswerField show={!!selectedOption} widthCh={longest}>
              <SelectionOptionButton
                text={selectedOption?.content ?? ""}
                isSelected={false}
                onClick={setSelectedOption}
              />
            </PromptAnswerField>
          )}
        </Fragment>
      ))}
    </p>
  );
}
