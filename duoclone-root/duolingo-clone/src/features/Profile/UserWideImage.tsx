type UserWideImageProps = {
  imgSrc: string;
};

export function UserWideImage({ imgSrc }: UserWideImageProps) {
  return (
    <img className="w-full h-50 object-cover rounded-xl" src={imgSrc} />
  );
}
