import { useEffect, useRef, useState } from 'react'
import './App.css'
import { LessonButton } from './Button/LessonButton'
import { LearnHeader } from './Header/LearnHeader'
import { SectionHeader } from './Unit/SectionHeader'
import { UnitPath } from './Unit/UnitPath'



function App() {

  const unitNames : string[] = ["Discuss a new Job", "Talk about your Habits", "Pack for a Vacation"]

  const lessons : string[] = ["Lesson", "Lesson", "Exercise", "Lesson", "Lesson", "Lesson", "Lesson"]
  const lessonsTwo : string[] = ["Lesson", "Lesson", "Exercise", "Lesson", "Lesson", "Lesson", "Lesson"]
  const lessonsThree : string[] = ["Lesson", "Lesson", "Exercise", "Lesson", "Lesson", "Lesson", "Lesson"]

  const allLessons = [lessons, lessonsTwo, lessonsThree]

    const [currentUnit, setCurrentUnit] = useState(unitNames[0]);
  const unitRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter visible entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        // Pick the unit closest to the top
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topEntry = visibleEntries[0];

        // Find index of this entry
        const index = unitRefs.current.findIndex(el => el === topEntry.target);
        if (index !== -1) {
          setCurrentUnit(unitNames[index]);
        }
      },
      { root: null, rootMargin: '-80px 0px 0px 0px', threshold: 0.5 } // Adjust rootMargin/threshold as needed
    );

    unitRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      unitRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <div className='w-dvw h-dvh flex flex-col overflow-auto bg-duoBackground'>
        <LearnHeader/>
        <SectionHeader currentUnit={currentUnit}/>
        <div className='w-full h-full overflow-auto'>
        {allLessons.map((lesson, index) => (
            <div key={index} ref={el => {
                              unitRefs.current[index] = el;
                              // no return statement -> returns undefined (void)
                            }}>
              <UnitPath unitName={unitNames[index + 1]} lessons={allLessons[index]} index={index} />
            </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default App

//    --transform-buttonTransform: translateY(5px);
