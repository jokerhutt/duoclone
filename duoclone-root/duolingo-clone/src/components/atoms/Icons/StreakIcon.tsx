
type StreakIconProps = {
  height?: string;
};

export function StreakIcon({height = "h-8"}: StreakIconProps) {
  return (
    <>
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/vendor/398e4298a3b39ce566050e5c041949ef.svg"
        className={`w-fit ${height}`}
      />
    </>
  );
}
