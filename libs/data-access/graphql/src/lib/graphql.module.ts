import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '@auth-app/auth';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: (configService: ConfigService) => ({
                autoSchemaFile: join(__dirname, 'schema.gql'), // dist/libs/data-access/graphql/schema.gql
                playground: configService.get<string>('MODE') === 'development',
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    providers: [UserResolver],
})
export class GraphqlModule {}
