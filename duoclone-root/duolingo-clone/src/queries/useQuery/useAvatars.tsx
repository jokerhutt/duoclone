import { useQuery } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { GET_AVATARS } from "../../util/paths";

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