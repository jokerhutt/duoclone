import { Header } from "../../components/molecules/Header/Header";

export function QuestsHeader () {

    return (

        <Header background="bg-duoDarkGreen" padding="4px">

            <div className="w-full h-full flex justify-center items-center border-b-4 border-b-white/80">
                <p className="text-lg text-white/80">QUESTS</p>
            </div>

        </Header>

    )

}