
export type UserModel = {
    id: string;
    githubId: string;
    username: string;
    name: string;
    avatarUrl?: string;
    githubUrl?: string;
    role: string;
    preferredLanguage: string;
    createdAt?: string;
    lastLoginAt?: string;
};

export const DefaultUser: UserModel = {
    id: "0",
    githubId: "0",
    username: "Loading...",
    name: "Loading...",
    role: "USER",
    preferredLanguage: "de",
    avatarUrl: undefined,
    githubUrl: undefined,
    lastLoginAt: undefined,
    createdAt: "Loading..."
}