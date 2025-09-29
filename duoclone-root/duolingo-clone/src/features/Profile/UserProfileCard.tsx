import { useNavigate } from "react-router";
import { useUser } from "../../queries/useQuery/useUser";
import type { UserType } from "../../Types/UserType";
import { format } from "date-fns";
import { RiPencilFill } from "react-icons/ri";
import { UserWideImage } from "./UserWideImage";
import type { CourseType } from "../../Types/CourseType";

type UserProfileCardProps = {
  user: UserType;
  followers: number;
  userCourseInstances: CourseType[];
};

export function UserProfileCard({ user, followers, userCourseInstances }: UserProfileCardProps) {
  const ts = user.createdAt;
  const joinDate = ts ? format(new Date(ts), "MMMM yyyy") : "";
  const navigate = useNavigate();

  const editAvatar = (e: any) => {
    e.stopPropagation();
    navigate("/avatar")
  }

  return (
    <>
      <div className="mt-20 relative flex px-4 justify-center">
        <div onClick={(e) => editAvatar(e)} className="absolute z-2 hover:cursor-pointer rounded-2xl p-2 bg-black/8 flex items-center justify-center border top-5 right-9">
          <RiPencilFill className="h-8 w-8"/>
        </div>
        <UserWideImage imgSrc={user.pfpSrc}/>
      </div>
      <div className="w-full flex px-4 justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full flex gap-1 flex-col">
            <p className="text-white text-2xl">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-duoGrayButtonText font-light text-xl">
              {user.username}
            </p>
            <p className="text-duoLightGray text-lg font-light">
              Joined {joinDate}
            </p>
            <p className="text-duoBlue">{followers} Followers</p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-end items-end">
          <div className="flex py-3 w-full gap-2 justify-end items-center">
            {userCourseInstances.map((course) => (
              <img onClick={() => navigate(`/courses/${user.id}`)} className="h-7" src={course.imgSrc}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
