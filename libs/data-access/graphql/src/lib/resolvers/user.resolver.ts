import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { RegisterUserInput } from '../inputs/register-user.input';
import { AuthService } from '@auth-app/auth';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async registerUser(@Args('input') user: RegisterUserInput): Promise<User> {
        return this.authService.registerUser(user);
    }

    @Query(() => String)
    sayHello(): string {
        return 'Hello from GraphQL!';
    }
}
