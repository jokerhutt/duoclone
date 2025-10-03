import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSectionTreeAndHydrate } from "./fetchSectionTreeAndHydrate.ts";
import { qk } from "../../constants/queryKeys.ts";
import type { SectionType } from "../../Types/SectionType";
import type { UnitType } from "../../Types/UnitType";
import { fetchUnitsBySection } from "./useUnitsBySection";
import { sectionBatcher } from "../batcher/sectionBatcher";


export function useSectionTree(sectionId?: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: sectionId != null ? qk.sectionTree(sectionId) : ["sectionTree", "pending"],
    enabled: sectionId != null,
    queryFn: async () => {
      if (sectionId == null) throw new Error("Missing sectionId");
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
  const enabled = !!sectionId;

  const sectionQ = useQuery({
    queryKey: sectionId ? qk.section(sectionId) : ["section", "pending"],
    enabled,
    queryFn: () => sectionBatcher.fetch(sectionId!),
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const unitsQ = useQuery({
    queryKey: sectionId ? qk.unitsBySection(sectionId) : ["unitsBySection", "pending"],
    enabled,
    queryFn: () => fetchUnitsBySection(sectionId!),
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    section: sectionQ.data as SectionType | undefined,
    units: unitsQ.data as UnitType[] | undefined,
    isLoading: enabled && (sectionQ.isLoading || unitsQ.isLoading),
    isError: sectionQ.isError || unitsQ.isError,
  };
}