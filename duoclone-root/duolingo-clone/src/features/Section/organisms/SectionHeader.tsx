import { RectangleButton } from "../../../components/atoms/Button/RectangleButton";

export function SectionHeader({ currentUnit }: { currentUnit: string }) {
  const color =
    currentUnit == "Discuss a new Job"
      ? "bg-duoGreen shadow-duoGreenShadow"
      : currentUnit == "Pack for a Vacation"
      ? "bg-duoBlue shadow-duoBlueShadow"
      : "bg-duoPink shadow-duoPinkShadow";

  const unitNumber =
    currentUnit == "Discuss a new Job"
      ? 1
      : currentUnit == "Pack for a Vacation"
      ? 3
      : 2;

  return (
    <RectangleButton color={color}>
      <div className="flex rounded-2xl h-20 w-full">
        <div className="w-5/6 h-full px-4 pb-3 flex flex-col">
          <div className="mt-3 text-duoSubText">
            <p>SECTION 3, UNIT {unitNumber}</p>
          </div>
          <div className="text-white text-xl">
            <p>{currentUnit}</p>
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
