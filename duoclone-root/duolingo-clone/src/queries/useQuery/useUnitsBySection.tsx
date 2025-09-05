import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { UnitType } from "../../Types/UnitType";
import { GET_UNITS_BY_SECTION } from "../../util/paths";

export async function fetchUnitsBySection(
  sectionId: number
): Promise<UnitType[]> {
  const res = await fetch(GET_UNITS_BY_SECTION(sectionId));
  if (!res.ok) throw new Error("Failed to fetch units");
  return (await res.json()) as UnitType[];
}

export function useUnitsBySection(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.unitsBySection(id),
    queryFn: () => fetchUnitsBySection(id),
    initialData: () => qc.getQueryData(qk.unitsBySection(id)),
  });
}
