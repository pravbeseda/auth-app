export interface User {
    id: number;
    name: string;
    email: string;
    photoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthenticatedUser extends User {
    accessToken: string;
}
