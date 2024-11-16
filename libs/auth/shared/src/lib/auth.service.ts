import { AuthenticatedUser, User } from './models/user';

export interface AuthService {
    validateUser(user: User): Promise<AuthenticatedUser>;
}
