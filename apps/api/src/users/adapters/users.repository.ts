import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@open-ham-awards/db';
import { IUserRepository } from '../domain/user.repository.interface';
import { User as DomainUser } from '../domain/user.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<DomainUser | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    if (!prismaUser) {
      return null;
    }
    return UserMapper.toDomain(prismaUser);
  }

  async save(user: DomainUser): Promise<DomainUser> {
    const dataForCreate = UserMapper.toPersistence(user);

    const newPrismaUser = await this.prisma.user.create({
      data: dataForCreate,
    });
    return UserMapper.toDomain(newPrismaUser);
  }

  async getAllUsers(): Promise<DomainUser[]> {
    const users = await this.prisma.user.findMany();
    if (!users) {
      return [];
    }

    return users.map((user) => UserMapper.toDomain(user));
  }
}
