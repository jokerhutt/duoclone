import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { UnitType } from '../../Types/UnitType';

export function useCurrentUnitStore() {
  const queryClient = useQueryClient();
  const queryKey = ['currentUnit'];

  const { data: currentUnit } = useQuery<UnitType | null>({
    queryKey,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5, // Changed from cacheTime to gcTime
    queryFn: () => queryClient.getQueryData(queryKey) ?? null, // Added queryFn
    initialData: null
  });

  const setCurrentUnit = (unit: UnitType) => {
    queryClient.setQueryData(queryKey, unit);
  };

  return { currentUnit, setCurrentUnit };
}