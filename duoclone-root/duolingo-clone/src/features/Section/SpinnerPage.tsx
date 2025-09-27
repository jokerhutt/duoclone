import { Spinner } from "../../components/atoms/Loading/Spinner";

type SpinnerPageProps = {
  color?: string;
};

export function SpinnerPage({ color = "border-duoGreen" }: SpinnerPageProps) {
  return (
    <div className="w-full h-full pb-30 flex justify-center items-center">
      <Spinner color={color} />
    </div>
  );
}
