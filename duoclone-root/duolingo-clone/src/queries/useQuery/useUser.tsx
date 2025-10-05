import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../constants/queryKeys.ts";
import { userBatcher } from "../batcher/userBatcher";

export function useUser(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.user(id),
    queryFn: () => userBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.user(id)),
    staleTime: 60_000,
  });
}
