import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_EXERCISES_BY_LESSON_ID } from "../../../util/paths";
import type { Exercise } from "../../../Types/ExerciseType";
import { ExerciseComponent } from "../molecules/ExerciseComponent";
import { SectionHeader } from "../../Section/organisms/SectionHeader";
import { LearnHeader } from "../../../components/Header/LearnHeader";


export function LessonPage () {

    const { lessonId } = useParams<{ lessonId: string }>();
    const {position} = useParams<{position: string}>();

    const [exercises, setExercises] = useState<Exercise[]>()

    useEffect(() => {
        if (!lessonId) return;
        fetch(GET_EXERCISES_BY_LESSON_ID(Number(lessonId)))
        .then(res => res.json())
        .then(data => {
            console.log("DATA: " + JSON.stringify(data))
            setExercises(data)})
    }, [lessonId])

    if (!lessonId || !position || !exercises || exercises.length < 1) return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-duoGreen border-t-transparent"></div>
        </div>
    )

    return (
        <div className="w-full h-full relative flex flex-col items-center">
    <nav className="w-full absolute flex justify-between z-10 items-center h-14 px-2">
    </nav>
    <div className="my-14 flex w-full h-full pt-4">
        <ExerciseComponent exercise={exercises[Number(position)]}/>
        
    </div>
            
        </div>
    )
}