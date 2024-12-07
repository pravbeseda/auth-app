import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
    private readonly prisma = new PrismaClient();

    async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: number, data: Partial<User>) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
