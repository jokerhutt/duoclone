import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { UnitType } from "../../Types/UnitType";

export function useCurrentUnitStore() {
  const queryClient = useQueryClient();
  const queryKey = ["currentUnit"];

  const { data: currentUnit } = useQuery<UnitType | null>({
    queryKey,
    staleTime: 60_000,
    gcTime: 1000 * 60 * 5,
    queryFn: () => queryClient.getQueryData(queryKey) ?? null,
    initialData: null,
  });

  const setCurrentUnit = (unit: UnitType) => {
    queryClient.setQueryData(queryKey, unit);
  };

  return { currentUnit, setCurrentUnit };
}
