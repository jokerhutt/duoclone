import { useNavigate } from "react-router";
import { CircleButton } from "../atoms/CircleButton";
import { getOffset } from "../../Lesson/pathOffets";

type LessonButtonProps = {
  idx: number
  lessonType: string[]
  courseIndex: number
}

export function LessonButton({ idx, lessonType, courseIndex }: LessonButtonProps) {

const navigate = useNavigate();

const lessonImage : string = lessonType[idx] == "Lesson" ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg" : "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg"

    const buttonColor = 
    courseIndex % 6 == 0 ? "bg-duoGreen shadow-duoGreenCircleShadow" :
    courseIndex % 6 == 1 ? "bg-duoPink shadow-duoPinkCircleShadow" :
    "bg-duoBlue shadow-duoBlueCircleShadow"

  return (
    <CircleButton icon={lessonImage} mainColor={buttonColor} onClick={() => navigate("/lessons" + idx)} offset={getOffset(courseIndex, idx)}/>
  )
}