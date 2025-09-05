import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSectionTreeAndHydrate } from "../../util/fetchSectionTreeAndHydrate";
import { qk } from "../types/queryKeys";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";

export function useSectionTree(sectionId: number) {
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: qk.sectionTree(sectionId),
    queryFn: () => fetchSectionTreeAndHydrate(qc, sectionId), // must return non-undefined (you did: `true`)
    enabled: Number.isFinite(sectionId),
    staleTime: 0,
    gcTime: 0,
    retry: false, // avoid silent re-tries while wiring
    refetchOnWindowFocus: false,
    select: () => null, // we don’t use the payload
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
