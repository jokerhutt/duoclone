import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UPDATE_AVATAR } from "../../util/paths";
import { qk } from "../types/queryKeys";
import type { UserType } from "../../Types/UserType";

interface UpdateAvatarVariables {
  selectedAvatar: string;
}

export function useUpdateAvatar() {
  const qc = useQueryClient();

  return useMutation<UserType, Error, UpdateAvatarVariables>({
    mutationFn: async (variables: UpdateAvatarVariables): Promise<UserType> => {
      const { selectedAvatar } = variables;

      const res = await fetch(UPDATE_AVATAR, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedAvatar }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update avatar");

      const data = (await res.json()) as UserType;
      return data;
    },
    onSuccess: (updatedUser: UserType) => {
      qc.setQueryData(qk.user(updatedUser.id), updatedUser);
      qc.setQueryData(qk.currentUser(), updatedUser);
    },
  });
}
