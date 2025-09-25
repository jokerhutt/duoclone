type ArrowIconProps = {
  isUp?: boolean;
  size?: string;
};


export function ArrowIcon({
  isUp = true,
  size = "h-6 w-6",
}: ArrowIconProps) {

    const upArrow = "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/6a4aeae39e2054b3d9a33cc8e5a05816.svg";
    const downArrow = "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/6a4aeae39e2054b3d9a33cc8e5a05816.svg";

    const arrowToShow = isUp ? upArrow : downArrow;

    return (
        <>
            <img className={size} src={arrowToShow}/>
        </>
    )

}
