import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../types/queryKeys";
import { GET_AUTH_ME } from "../../../util/paths";

export function useCurrentUser() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: qk.currentUserId(),
    queryFn: async () => {
      const res = await fetch(GET_AUTH_ME, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const user = await res.json();
      queryClient.setQueryData(qk.user(user.id), user);
      
      return user;
    },
    retry: false,
    staleTime: 1 * 60 * 1000,
  });
}