import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_EXERCISES_BY_LESSON_ID } from "../../../util/paths";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { ExerciseComponent } from "../molecules/ExerciseComponent";
import { SectionHeader } from "../../Section/organisms/SectionHeader";
import { LearnHeader } from "../../../components/Header/LearnHeader";
import { Header } from "../../../components/Header/Header";
import { XIcon } from "../../../components/atoms/Icons/XIcon";
import { HeartIcon } from "../../../components/atoms/Icons/HeartIcon";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const [exercises, setExercises] = useState<Exercise[]>();
  const [selectedOption, setSelectedOption] = useState<ExerciseOption | null>(
    null
  );

  const navigate = useNavigate();

  const checkButtonStyle = selectedOption
    ? "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen"
    : "bg-duoGrayBorder";

  const isSelectedOption = (option: ExerciseOption) => {
    return selectedOption != null && selectedOption.id == option.id;
  };
  useEffect(() => {
    if (!lessonId) return;
    fetch(GET_EXERCISES_BY_LESSON_ID(Number(lessonId)))
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA: " + JSON.stringify(data));
        setExercises(data);
      });
  }, [lessonId]);

  const goToNextExercise = () => {
    console.log("POS: " + position + " EXERCISES LEN: " + exercises?.length);
    if (selectedOption && position && exercises) {
      if (Number(position) < exercises.length - 1) {
        const next = Number(position) + 1;

        setSelectedOption(null);
        navigate(`/lessons/${lessonId}/${next}`);
      } else if (Number(position) == exercises.length - 1) {
        setSelectedOption(null);
        navigate("/");
      }
    }
  };

  if (!lessonId || !position || !exercises || exercises.length < 1)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-duoGreen border-t-transparent"></div>
      </div>
    );

  return (
    <div className="w-full h-full relative flex flex-col px-3 py-6 items-center">
      <Header padding="px-4" height="">
        <XIcon />
        <div className="w-full h-7 px-6 py-1">
          <div className="w-full bg-duoGrayBorder rounded-4xl h-full border"></div>
        </div>
        <HeartIcon />
      </Header>
      <div className="my-14 flex w-full h-full pt-4">
        <ExerciseComponent
          exercise={exercises[Number(position)]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isSelectedOption={isSelectedOption}
        />
      </div>
      <div
        className={`w-full rounded-2xl h-14 justify-center items-center ${checkButtonStyle} flex text-xl`}
      >
        <p
          className="text-duoGrayButtonText"
          onClick={() => goToNextExercise()}
        >
          Check
        </p>
      </div>
    </div>
  );
}
("");
