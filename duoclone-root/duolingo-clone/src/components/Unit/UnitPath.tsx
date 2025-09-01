import { LessonButton } from "../Button/LessonButton"
import { UnitBreak } from "./UnitBreak"

type UnitPathProps = {

    lessons: string[]
    index: number
    unitName: string

}

export function UnitPath ({lessons, index, unitName}: UnitPathProps) {

    const shouldInvert = index % 2 == 0 ? false : true


    return (
    <>
    <div className="flex flex-col w-full items-center mt-20 mb-20 space-y-6 relative">
        {lessons.map((lesson, idx) => (
          <div className="w-auto py-2" key={idx}>
            <LessonButton  idx={idx} lessonType={lessons} courseIndex={index} inverted={shouldInvert}/>
          </div>
        ))}
    </div>
    <UnitBreak lesson={unitName}/>
    </>
    )

}