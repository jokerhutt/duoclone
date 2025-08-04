import { LessonButton } from "../Button/LessonButton"

type UnitPathProps = {

    lessons: string[]

}

export function UnitPath ({lessons}: UnitPathProps) {

    return (
    <div className="flex flex-col w-full h-full items-center mt-8 space-y-6 relative">
        {lessons.map((lesson, idx) => (
          <div className="w-auto py-2" key={idx}>
            <LessonButton idx={idx} lessonType={lessons}/>
          </div>
        ))}
    </div>
    )

}