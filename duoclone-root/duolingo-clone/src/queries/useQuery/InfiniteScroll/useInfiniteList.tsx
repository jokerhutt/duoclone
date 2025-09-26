import {
  useInfiniteQuery,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { GET_PAGINATED_LEADERBOARD } from "../../../util/paths";

type UserDto = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  pfpSrc: string | null;
  points: number;
  streakLength: number;
};
type Page = { users: UserDto[]; nextCursor: string | null };

export function useInfiniteList() {
  const qc = useQueryClient();

  const q = useInfiniteQuery<
    Page,
    Error,
    InfiniteData<Page>,
    ["leaderboard"],
    string | null
  >({
    queryKey: ["leaderboard"],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const r = await fetch(GET_PAGINATED_LEADERBOARD(pageParam, 20));
      if (!r.ok) throw new Error("failed");
      return (await r.json()) as Page;
    },
    getNextPageParam: (last) => last.nextCursor,
    staleTime: 60_000,
  });

  const users: UserDto[] = q.data?.pages?.flatMap((p) => p.users) ?? [];
  const lastPage = q.data?.pages?.[q.data.pages.length - 1];

  useEffect(() => {
    if (users.length > 0) {
      for (const u of users) {
        qc.setQueryData<UserDto>(["user", u.id], (prev) =>
          prev ? { ...prev, ...u } : u
        );
      }
    }
  }, [users, qc]);

  return {
    users,
    fetchNextPage: q.fetchNextPage,
    hasNextPage: !!lastPage?.nextCursor,
    isFetchingNextPage: q.isFetchingNextPage,
    isLoading: q.isLoading,
    error: q.error,
  };
}
