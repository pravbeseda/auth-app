export interface User {
    id: string;
    displayName: string;
    email: string;
    photoUrl?: string;
}

export interface AuthenticatedUser extends User {
    accessToken: string;
}
