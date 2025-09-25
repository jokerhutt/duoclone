import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { userBatcher } from "../batcher/userBatcher";

export function useUser(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.user(id),
    queryFn: () => userBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.user(id)),
  });
  
}
