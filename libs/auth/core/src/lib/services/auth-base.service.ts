import { AuthenticatedUser, User } from '../models/user';

export abstract class AuthBaseService {
    abstract validateUser(user: User): Promise<AuthenticatedUser>;
}
