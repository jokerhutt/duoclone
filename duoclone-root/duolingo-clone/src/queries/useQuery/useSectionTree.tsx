import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSectionTreeAndHydrate } from "../../util/fetchSectionTreeAndHydrate";
import { qk } from "../types/queryKeys";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";

export function useSectionTree(sectionId: number) {
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: qk.sectionTree(sectionId),
    queryFn: () => fetchSectionTreeAndHydrate(qc, sectionId),
    enabled: Number.isFinite(sectionId),
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

export function useSectionTreeData(sectionId: number) {
  const qc = useQueryClient();
  const section = qc.getQueryData<SectionType>(qk.section(sectionId));
  const units = qc.getQueryData<UnitType[]>(qk.unitsBySection(sectionId));
  return { section, units };
}
