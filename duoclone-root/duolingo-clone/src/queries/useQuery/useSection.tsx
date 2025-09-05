import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { sectionBatcher } from "../batcher/sectionBatcher";

export function useSection(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.section(id),
    queryFn: () => sectionBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.section(id)),
  });
}
