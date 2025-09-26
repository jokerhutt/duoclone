import { SpinnerPage } from "../../../features/Section/SpinnerPage";
import { Spinner } from "../Loading/Spinner";

type InfiniteScrollTriggerRefProps = {
  sentinelRef: any;
  isFetchingNextPage: boolean;
};

export function InfiniteScrollTriggerRef({sentinelRef, isFetchingNextPage}: InfiniteScrollTriggerRefProps) {
  return (
    <div ref={sentinelRef} className="h-20 flex justify-center items-center">
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
