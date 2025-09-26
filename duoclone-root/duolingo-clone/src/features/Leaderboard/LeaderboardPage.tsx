import { useEffect, useMemo, useRef } from "react";
import { useInfiniteList } from "../../queries/useQuery/InfiniteScroll/useInfiniteList";
import { UserRow } from "../Profile/FriendsWidget/UserRow";
import { SpinnerPage } from "../Section/SpinnerPage";
import { useInView } from "react-intersection-observer";

export function LeaderboardPage() {
  const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteList();

  const { ref: sentinelRef, inView: isInView } = useInView({
    rootMargin: "100px 0px",
    threshold: 0,
  });

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => b.points - a.points || a.id - b.id),
    [users]
  );

  useEffect(() => {
    console.log("Effect triggered:", {
      isInView,
      hasNextPage,
      isFetchingNextPage,
    });
    if (isInView && hasNextPage && !isFetchingNextPage) {
      console.log("Fetching next page");
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full py-4 flex items-center flex-col">
      <div className="w-full flex flex-col pb-4 border-b border-b-duoGrayBorder items-center gap-4">
        <img
          className="h-20"
          src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/3ced84eb1f0274ec0f02b24ae6e3d29b.svg"
        />
        <h1 className="text-3xl text-white">Leaderboard</h1>
      </div>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <div className="flex flex-col w-full gap-2">
          {sortedUsers.map((user) => (
            <UserRow userId={user.id} specialBg={user.id == 1}/>
          ))}
          <div
            ref={sentinelRef}
            className="h-20 flex justify-center items-center"
          >
            {isFetchingNextPage && <SpinnerPage />}
          </div>
        </div>
      )}
    </div>
  );
}
