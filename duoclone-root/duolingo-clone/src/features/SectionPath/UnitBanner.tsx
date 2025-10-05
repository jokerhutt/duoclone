import { RectangleButton } from "../../components/atoms/Button/RectangleButton.tsx";
import type { UnitType } from "../../Types/UnitType.ts";

type UnitBannerProps = {
  currentUnit: UnitType | null;
};

export function UnitBanner({ currentUnit }: UnitBannerProps) {
  if (currentUnit)
    return (
      <RectangleButton
        buttonWidth="w-full 2xl:w-3/4"
        unitColor={currentUnit?.color}
      >
        <div className="flex rounded-2xl h-20 w-full">
          <div className="w-5/6 h-full px-4 pb-3 flex flex-col">
            <div className="mt-3 text-duoSubText">
              <p>SECTION 1, UNIT {currentUnit?.orderIndex}</p>
            </div>
            <div className="text-white text-xl">
              <p>{currentUnit?.title}</p>
            </div>
          </div>
          <div className="h-full w-1/6 border-l flex justify-center items-center">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/path/5b531828e59ae83aadb3d88e6b3a98a8.svg"
              alt="Unit icon"
            />
          </div>
        </div>
      </RectangleButton>
    );
}
