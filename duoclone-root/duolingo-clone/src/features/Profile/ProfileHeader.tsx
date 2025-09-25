import { Header } from "../../components/molecules/Header/Header";

export function ProfileHeader () {

    return (

        <Header height="h-auto">
            <div className="w-full border-b-2 border-b-duoGrayButtonText h-full py-6 flex justify-center items-center">
                <p className="text-3xl text-duoGrayButtonText ">Profile</p>
            </div>
        </Header>

    )

}