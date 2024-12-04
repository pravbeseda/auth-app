import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
    private readonly prisma = new PrismaClient();

    async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
