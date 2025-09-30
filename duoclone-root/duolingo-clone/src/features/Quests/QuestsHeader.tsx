import { Header } from "../../components/molecules/Header/Header";

export function QuestsHeader () {

    return (

        <Header background="bg-duoDarkGreen" padding="px-4">

            <div className="w-full h-full z-20 flex justify-center items-center border-b-4 border-b-white/80">
                <p className="text-lg text-white/80">QUESTS</p>
            </div>

        </Header>

    )

}