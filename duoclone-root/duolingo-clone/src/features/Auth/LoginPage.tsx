import { WideActionButton } from "../Common/WideActionButton";

export function LoginPage() {
  return (
    <div className="w-full flex items-center px-4 flex-col gap-6 justify-center h-full bg-white">
      <div className="w-full flex items-center flex-col">
        <img src="https://d35aaqx5ub95lt.cloudfront.net/images/splash/lottie/a774fe14d71e450d59a9bc4ed5d210c9.png" />
        <h1 className="text-3xl">Jokerhut's Duolingo Clone</h1>
        <p className="text-center font-light py-2 text-lg">This is a Duolingo clone that i made as a strictly non-commercial practice / learning project.</p>
      </div>

      <div className="w-full">
        <WideActionButton onSubmit={() => console.log("hi")} isActive={true} activeTextColor="text-white" text="JOIN WITH GOOGLE" activeText="JOIN WITH GOOGLE"/>
      </div>  


      <div>

      </div>
    </div>
  );
}
