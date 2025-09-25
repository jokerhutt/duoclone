export function UserProfileCard() {
  return (
    <>
      <div className="mt-20 flex px-4 justify-center">
        <img
          className="w-full h-50 object-cover rounded-xl"
          src="/pfp/av3.png"
        />
      </div>
      <div className="w-full flex px-4 justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full flex gap-1 flex-col">
            <p className="text-white text-3xl">The Jokerhut</p>
            <p className="text-duoGrayButtonText font-light text-xl">
              thejokerhut
            </p>
            <p className="text-duoLightGray text-lg font-light">
              Joined September 2025
            </p>
            <p className="text-duoBlue">7 Friends</p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-end items-end">
          <div className="flex py-3 w-full gap-2 justify-end items-center">
            <img className="h-7" src="/flags/frenchSvg.svg" />
            <img className="h-7" src="/flags/germanSvg.svg" />
            <img className="h-7" src="/flags/spanishSvg.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
