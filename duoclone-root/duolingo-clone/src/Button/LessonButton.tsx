type LessonButtonProps = {
  idx: number
  lessonType: string[]
  inverted: boolean;
}

export function LessonButton({ idx, lessonType, inverted }: LessonButtonProps) {

const offsets = inverted ? [
    'ml-0',
    'ml-20',
    'ml-36',
    'ml-16',
    'mr-4',
    'mr-20',
    'mr-0',
    'mr-16',
    'mr-0',
    'ml-16',
    'ml-36',
] : [
    'ml-0',
    'mr-20',
    'mr-36',
    'mr-16',
    'ml-4',
    'ml-20',
    'ml-0',
    'ml-16',
    'ml-0',
    'mr-16',
    'mr-36',
];

const lessonImage : string = lessonType[idx] == "Lesson" ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg" : "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg"

  return (
        <button
        className={`h-14 w-16 rounded-full bg-duoGreen shadow-duoCircleShadow active:translate-y-[5px] active:shadow-none flex items-center justify-center
        ${offsets[idx]}
        `}
        style={{ transition: 'transform 0.2s' }}
        aria-label={`Lesson ${idx}`}
        >
      <img
        src={lessonImage}
        className={`flex items-center justify-center rounded-full`}
        alt={`Icon for lesson ${idx}`}
      />
    </button>
  )
}