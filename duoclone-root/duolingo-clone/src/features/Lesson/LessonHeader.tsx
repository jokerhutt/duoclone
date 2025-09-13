import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { XIcon } from "../../components/atoms/Icons/XIcon";
import { Header } from "../../components/molecules/Header/Header";


export function LessonHeader () {

    return (
      <Header padding="px-4" height="">
        <XIcon />
        <div className="w-full h-7 px-6 py-1">
          <div className="w-full bg-duoGrayBorder rounded-4xl h-full border"></div>
        </div>
        <HeartIcon />
      </Header>
    )

}