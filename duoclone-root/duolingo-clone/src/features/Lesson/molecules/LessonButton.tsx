import { useNavigate } from "react-router";
import { CircleButton } from "../../../components/atoms/Button/CircleButton";
import { getOffset } from "../../../Lesson/pathOffets";
import {type  LessonType, type TypeOfLesson } from "../../../Types/LessonType";
import { useEffect, useState } from "react";
import { parseIdsToRequestParam } from "../../../util/pathParsers";
import { GET_LESSONS_FROM_IDS } from "../../../util/paths";

type LessonButtonProps = {
  idx: number;
  id: number;
  courseIndex: number;
};

export function LessonButton({ idx, id, courseIndex }: LessonButtonProps) {
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonType>()

  useEffect(() => {
    console.log("Fetching");
    const ids = parseIdsToRequestParam("lessonIds", [id]);
    fetch(GET_LESSONS_FROM_IDS(ids))
      .then((res) => res.json())
      .then((data) => {
        console.log("RES FOR LESSON DATA: " + JSON.stringify(data))
        setLesson(data[0])});
  }, [id]);

  const lessonImage: string =
    lesson && lesson.lessonType == "Lesson"
      ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg"
      : "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg";

  const buttonColor =
    courseIndex % 6 == 0
      ? "bg-duoGreen shadow-duoGreenCircleShadow"
      : courseIndex % 6 == 1
      ? "bg-duoPink shadow-duoPinkCircleShadow"
      : "bg-duoBlue shadow-duoBlueCircleShadow";

  if (!lesson) return null;

  return (
    <CircleButton
      icon={lessonImage}
      mainColor={buttonColor}
      onClick={() => navigate("/lessons/" + id + "/" + 0)}
      offset={getOffset(courseIndex, idx)}
    />
  );
}
