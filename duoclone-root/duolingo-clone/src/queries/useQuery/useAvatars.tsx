import { useQuery } from "@tanstack/react-query";
import { qk } from "../../constants/queryKeys.ts";
import { GET_AVATARS } from "../../constants/paths.ts";

export function useAvatars() {
    return useQuery({
        queryKey: qk.avatars(),
        queryFn: () => fetchAvatars(),
        staleTime: 60_000,
    })
}

export async function fetchAvatars (): Promise<string[]> {
    const res = await fetch(GET_AVATARS);
    if (!res.ok) throw new Error("Failed to fetch avatars")
    return (await res.json()) as string[];
}