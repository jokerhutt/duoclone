import { UserRow } from "../Common/UserRow.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInStagger } from "../../effects/FadeInAnimation";
import { Spinner } from "../../components/atoms/Loading/Spinner";
import { useLeaderboardFlow } from "../../hooks/useLeaderboardFlow.tsx";
import { LeaderboardHeader } from "./LeaderboardHeader.tsx";

export function LeaderboardPage() {

  const {currentUser, users, sentinelRef, isLoading, hasNextPage} = useLeaderboardFlow();

  return (
    <div className="w-full h-full pb-20 lg:pb-4 py-4 flex items-center flex-col">
      <LeaderboardHeader/>
      {users && !isLoading && (
        <AnimatePresence>
          <motion.div
            {...fadeInStagger(1)}
            className="flex flex-col w-full pt-2 gap-2"
          >
            {users.map((user) => (
              <UserRow
                key={user.id}
                userInstance={user}
                userId={user.id}
                specialBg={user.id == currentUser?.id}
              />
            ))}
            <div
              ref={sentinelRef}
              className={`h-20 flex justify-center items-center ${
                hasNextPage ? "" : "hidden"
              }`}
            >
              <Spinner />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
