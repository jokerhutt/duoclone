import type { friendsTabType } from "../../../Types/friendsTabType";
import { UserRow } from "./UserRow";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInStagger } from "../../../animations/FadeInAnimation";
type FriendsListProps = {
  activeTab: friendsTabType;
  toDisplay: number[];
};

export function FriendsList({ toDisplay }: FriendsListProps) {
  return (
    <AnimatePresence>
      <motion.div 
      {...fadeInStagger(1)}
      className="w-full flex scrollbar-duoGreen overflow-y-auto max-h-160 my-2 px-4 flex-col">
        {toDisplay.map((userId) => (
          <UserRow userId={userId} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
