import { useCallback, useState } from "react";
import type { ExerciseOption } from "../Types/ExerciseType";

type Args = {
  enabled: boolean;
};

export type useOptionsReturn = {
  currentSelectedOptions: ExerciseOption[];
  addOption: (option: ExerciseOption) => void;
  removeOption: (option: ExerciseOption) => void;
  clearOptions: () => void;
};

export function useOptions({ enabled }: Args): useOptionsReturn {
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

  const removeOption = useCallback(
    (option: ExerciseOption) => {
      if (!enabled) return;
      setCurrentSelectedOptions((prev) =>
        prev.filter((opt) => opt.id !== option.id)
      );
    },
    [enabled]
  );

  const addOption = useCallback(
    (option: ExerciseOption) => {
      if (!enabled) return;
      setCurrentSelectedOptions((prev) =>
        prev.some((opt) => opt.id === option.id) ? prev : [...prev, option]
      );
    },
    [enabled]
  );

  const clearOptions = useCallback(() => setCurrentSelectedOptions([]), []);

  return {
    currentSelectedOptions,
    addOption,
    removeOption,
    clearOptions
  };
}
