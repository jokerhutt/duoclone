import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { unitBatcher } from "../batcher/unitBatcher";

export function useUnit(id: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: qk.unit(id),
    queryFn: () => unitBatcher.fetch(id!),
    staleTime: 60_000,
    initialData: () => qc.getQueryData(qk.unit(id)),
  });
}
