import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../constants/queryKeys.ts";
import { sectionBatcher } from "../batcher/batchers.ts";

export function useSection(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.section(id),
    queryFn: () => sectionBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.section(id)),
    staleTime: 60_000,
  });
}
