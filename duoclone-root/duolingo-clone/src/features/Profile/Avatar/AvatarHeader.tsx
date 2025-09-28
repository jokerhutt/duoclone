import { useNavigate } from "react-router";
import { Header } from "../../../components/molecules/Header/Header";

type AvatarHeaderProps = {
    currentUserId: number;
    submit: () => void;
}

export function AvatarHeader ({currentUserId, submit}: AvatarHeaderProps) {

    const navigate = useNavigate();

    const closePage = () => {
        navigate(`/profile/${currentUserId}`)
    }

    return (

        <Header>
            <div className="w-full border-b-2 border-b-duoGrayButtonText h-full py-6 px-4 flex justify-between items-center">
                <p className="text-lg text-start text-duoGrayButtonText w-20">X</p>
                <p className="text-xl text-center text-duoGrayButtonText w-full">Edit Avatar</p>
                <p onClick={submit} className="w-20 text-end text-duoBlue text-xl">DONE</p>
            </div>
        </Header>

    )

}