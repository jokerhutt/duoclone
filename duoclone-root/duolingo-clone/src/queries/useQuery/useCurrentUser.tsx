import { useQuery } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { UserType } from "../../Types/UserType";
import { GET_USER_BY_ID } from "../../util/paths";

export function useCurrentUser(userId: number) {

    return useQuery({
        queryKey: qk.user(userId),
        queryFn: () => fetchUserById(userId),
    })

}

export async function fetchUserById (userId: number): Promise<UserType> {

    const res = await fetch(GET_USER_BY_ID(userId));
    if (!res.ok) throw new Error("Failed to fetch user")
    return (await res.json()) as UserType;
}
