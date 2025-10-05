import Lottie from "lottie-react";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { OptionsList } from "../Options/OptionsList.tsx";
import { SelectionOptionButton } from "../Options/SelectionOptionButton";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInStagger } from "../../../effects/FadeInAnimation";
import { getRowsForAnswerField, splitAnswerFieldIntoRows } from "../../../util/answerFieldUtils.ts";
import { useRandomLottie } from "../../../hooks/useRandomLottie.tsx";
import { EX_ANIMATIONS } from "../../../constants/animationPaths.ts";

type ComponentSentenceExerciseProps = {
  exercise: Exercise;
  addOption: (option: ExerciseOption) => void;
  currentSelectedOptions: ExerciseOption[];
  removeOption: (option: ExerciseOption) => void;
};

export function ComposeSentenceExercise({
  exercise,
  currentSelectedOptions,
  addOption,
  removeOption,
}: ComponentSentenceExerciseProps) {

  const animationData = useRandomLottie(EX_ANIMATIONS);

  const plannedRows = getRowsForAnswerField(exercise, 30);
  const displayRows = splitAnswerFieldIntoRows(currentSelectedOptions, 30);

    if (!!animationData) return (
      <AnimatePresence>
        <motion.div {...fadeInStagger(0.4)} className="w-full h-full flex flex-col gap-2">
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
        </motion.div>
      </AnimatePresence>
    );
}
