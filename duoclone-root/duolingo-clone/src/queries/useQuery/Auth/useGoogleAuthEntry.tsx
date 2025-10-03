import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/queryKeys.ts";
import { GOOGLE_LOGIN } from "../../../constants/paths.ts";
import type { UserType } from "../../../Types/UserType";

export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();

  return useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      const res = await fetch(GOOGLE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeResponse.code }),
        credentials: "include",
      });

      const user: UserType = await res.json();
      queryClient.setQueryData(qk.user(user.id), user);
      queryClient.setQueryData(qk.currentUser(), user);

      if (user.currentCourseId == null) {
        window.location.href = "/auth/courses"
      } else {
        window.location.href = "/";
      }
    },
    onError: (err) => console.error("Google login failed", err),
  });
}
