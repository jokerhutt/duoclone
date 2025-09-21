
type LessonResultProps = {
    isCorrect: boolean;
    correctAnswer: string;
}

export function LessonResult({isCorrect, correctAnswer}: LessonResultProps) {

  const correctColor = "text-duoLightGreen"
  const incorrectColor = "text-duoIncorrectRed"  

  const incorrectHeader = "Correct Solution:"
  const correctHeader = "Great!"

  const color = isCorrect ? correctColor : incorrectColor;
  const header = isCorrect ? correctHeader : incorrectHeader;

  return (
    <div className="fixed inset-x-0 p-4 bottom-0 pb-24 gap-2 w-full flex flex-col bg-duoDarkGray">
        <p className={`text-2xl ${color}`}>{header}</p>
        {!isCorrect && (
            <p className={`${color} font-light`}>{correctAnswer}</p>
        )}
    </div>
  );
}
