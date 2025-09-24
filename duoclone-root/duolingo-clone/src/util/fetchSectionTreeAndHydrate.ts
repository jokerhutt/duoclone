import { QueryClient } from "@tanstack/react-query";
import type { SectionTreeNode } from "../Types/SectionTree/SectionTreeNodeTypes";
import { GET_BULK_TREE } from "./paths";
import { qk } from "../queries/types/queryKeys";

export async function fetchSectionTreeAndHydrate(qc: QueryClient, id: number) {
  const tree = await fetchSectionTree(id);

  //SET SECTION TREE QUERY
  qc.setQueryData(qk.section(id), tree.section);

  console.log(JSON.stringify("TREE IS: " + tree));

  //SET UNIT TREE QUERY
  const units = tree.units
    .map((unitNode) => unitNode.unit)
    .sort((a, b) => a.orderIndex - b.orderIndex);
  qc.setQueryData(qk.unitsBySection(id), units);

  for (const unitNode of tree.units) {
    //SET INDIVIDUAL UNIT QUERY
    qc.setQueryData(qk.unit(unitNode.unit.id), unitNode.unit);

    const lessons = [...unitNode.lessons].sort(
      (a, b) => a.orderIndex - b.orderIndex
    );

    //SET LESSON TREE QUERY
    qc.setQueryData(qk.lessonsByUnit(unitNode.unit.id), lessons);

    for (const lesson of lessons) {
      //SET INDIVIDUAL LESSON QUERY
      qc.setQueryData(qk.lesson(lesson.id), lesson);
    }
  }

  return true;
}

export async function fetchSectionTree(
  sectionId: number
): Promise<SectionTreeNode> {
  const res = await fetch(GET_BULK_TREE(sectionId));
  if (!res.ok) throw new Error(`Failed to fetch sectionTree for ${sectionId}`);
  return (await res.json()) as SectionTreeNode;
}
