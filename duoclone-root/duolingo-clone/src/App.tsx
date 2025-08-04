import './App.css'
import { LessonButton } from './Button/LessonButton'
import { LearnHeader } from './Header/LearnHeader'
import { SectionHeader } from './Unit/SectionHeader'
import { UnitPath } from './Unit/UnitPath'



function App() {

  const lessons : string[] = ["Lesson", "Lesson", "Exercise", "Lesson", "Lesson", "Lesson", "Lesson"]

  return (
    <>
      <div className='w-dvw h-dvh flex flex-col bg-duoBackground'>
        <LearnHeader/>
        <SectionHeader/>
        <UnitPath lessons={lessons}/>
      </div>
    </>
  )
}

export default App

//    --transform-buttonTransform: translateY(5px);
