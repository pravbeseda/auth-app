export interface User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRegisterInput {
    email: string;
    password: string;
    name: string;
}
