import { useGoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "../../types/queryKeys";
import { GOOGLE_LOGIN } from "../../../util/paths";

export function useGoogleAuthEntry() {
  const queryClient = useQueryClient();

  return useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(GOOGLE_LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
          credentials: "include",
        });

        if (!res.ok) throw new Error("Login failed");

        const { user } = await res.json();

        // Only cache the user data by ID
        queryClient.setQueryData(qk.user(user.id), user);

        // Store just the current user ID for reference
        queryClient.setQueryData(qk.currentUserId(), user.id);

        window.location.href = "/";
      } catch (err) {
        console.error("Login error:", err);
      }
    },
    onError: () => console.error("Google login failed"),
  });
}
