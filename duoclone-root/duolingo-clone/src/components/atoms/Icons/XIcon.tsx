type XIconProps = {
  onClick: () => void;
}

export function XIcon({onClick}: XIconProps) {
  return (
    <>
      <img onClick={onClick} src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg" />
    </>
  );
}
