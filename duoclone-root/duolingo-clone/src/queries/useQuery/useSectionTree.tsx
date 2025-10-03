import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSectionTreeAndHydrate } from "../../util/fetchSectionTreeAndHydrate";
import { qk } from "../types/queryKeys";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";

export function useSectionTree(sectionId?: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: sectionId != null ? qk.sectionTree(sectionId) : ['sectionTree','pending'],
    enabled: sectionId != null,
    queryFn: async () => {
      if (sectionId == null) throw new Error('Missing sectionId');
      await fetchSectionTreeAndHydrate(qc, sectionId);
      return { hydrated: true, sectionId };
    },
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useSectionTreeData(sectionId?: number) {
  const qc = useQueryClient();

  if (sectionId == null) return { section: undefined, units: undefined };

  const section = qc.getQueryData<SectionType>(qk.section(sectionId));
  const units = qc.getQueryData<UnitType[]>(qk.unitsBySection(sectionId));

  return { section, units };
}
