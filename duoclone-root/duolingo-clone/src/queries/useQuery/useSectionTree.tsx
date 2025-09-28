import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSectionTreeAndHydrate } from "../../util/fetchSectionTreeAndHydrate";
import { qk } from "../types/queryKeys";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";

export function useSectionTree(userId: number, sectionId?: number) {
  const qc = useQueryClient();

  const q = useQuery({
    queryKey:
      sectionId != null
        ? qk.sectionTree(sectionId)
        : (["sectionTree", "pending"] as const),
    queryFn: () => {
      if (sectionId == null) throw new Error("Missing sectionId");
      return fetchSectionTreeAndHydrate(qc, sectionId, userId);
    },
    enabled: sectionId != null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    refetchOnWindowFocus: false,
    select: () => null,
  });

  return {
    isLoading: q.isLoading,
    isFetching: q.isFetching,
    isError: q.isError,
    error: q.error,
    refetch: q.refetch,
  };
}

export function useSectionTreeData(sectionId?: number) {
  const qc = useQueryClient();

  if (sectionId == null) return { section: undefined, units: undefined };

  const section = qc.getQueryData<SectionType>(qk.section(sectionId));
  const units = qc.getQueryData<UnitType[]>(qk.unitsBySection(sectionId));

  return { section, units };
}
