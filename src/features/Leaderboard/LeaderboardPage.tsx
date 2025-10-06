import { UserRow } from "../Common/UserRow.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInStagger } from "../../effects/FadeInAnimation";
import { Spinner } from "../../components/atoms/Loading/Spinner";
import { useLeaderboardFlow } from "../../hooks/useLeaderboardFlow.tsx";

export function LeaderboardPage() {

  const {currentUser, users, sentinelRef, isLoading, hasNextPage} = useLeaderboardFlow();

  return (
    <div className="w-full h-full pb-20 lg:pb-4 py-4 flex items-center flex-col">
      <div className="w-full flex flex-col pb-4 border-b border-b-duoGrayBorder items-center gap-4">
        <img
          className="h-20"
          src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/3ced84eb1f0274ec0f02b24ae6e3d29b.svg"
        />
        <h1 className="text-3xl text-white">Leaderboard</h1>
      </div>
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
