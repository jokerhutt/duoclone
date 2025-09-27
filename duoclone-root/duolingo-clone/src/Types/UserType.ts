
export type UserType = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    pfpSrc: string;
    points: number;
    createdAt?: string;
    streakLength: number;
}