import type { SectionTreeNode } from "./SectionTreeNodeTypes";



export function parserTree (sNode: SectionTreeNode) {

    for (let i = 0; i < sNode.units.length; i++) {
        const unit = sNode.units[i].unit
        const lessons = sNode.units[i].lessons

        //set unit to units query ["unit", unit.id]

        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            //set lesson to lesson query ["lesson", lesson.id]
        }

    }    


}