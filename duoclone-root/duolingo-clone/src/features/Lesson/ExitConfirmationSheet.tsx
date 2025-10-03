import { useNavigate } from "react-router";
import { WideActionButton } from "../../components/atoms/Button/WideActionButton.tsx";
import { motion } from "framer-motion";

type ExitConfirmationSheetProps = {
    setIntendsToExit: () => void;
}

export function ExitConfirmationSheet({setIntendsToExit}: ExitConfirmationSheetProps) {

  const navigate = useNavigate();  

  return (
    <motion.div className="h-110 z-40 py-10 flex flex-col gap-4 px-6 items-center w-full bg-duoDarkGrayAlt">
      <img src="https://d35aaqx5ub95lt.cloudfront.net/images/ed9f592a37a6ce248be0beec9c13a0e1.svg" />
      <p className="text-center text-2xl text-white">
        Wait, don’t go! You’ll lose your progress if you quit now
      </p>
      <WideActionButton
        height="h-14 lg:w-1/2"
        activeColor="bg-duoBlue"
        activeTextColor=""
        onSubmit={setIntendsToExit}
        text={"KEEP LEARNING"}
        activeText="KEEP LEARNING"
        isActive={true}
      />

      <WideActionButton
        activeColor=""
        height="h-14 lg:w-1/2"
        activeTextColor="text-duoRed/70"
        onSubmit={() => navigate("/")}
        text={"END LESSON"}
        activeText="END LESSON"
        isActive={true}
      />
    </motion.div>
  );
}
