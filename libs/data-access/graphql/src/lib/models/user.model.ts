import { ObjectType, Field } from '@nestjs/graphql';
import { User as IUser } from '@auth-app/shared';

@ObjectType()
export class User implements IUser {
    @Field()
    id!: number;

    @Field()
    email!: string;

    @Field()
    name!: string;

    @Field()
    createdAt: Date = new Date();

    @Field()
    updatedAt: Date = new Date();
}
