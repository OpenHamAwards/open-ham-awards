import { Injectable } from '@nestjs/common';
import { User as PrismaUser, Prisma } from '@open-ham-awards/db';
import { User as DomainUser } from '../../domain/user.entity';

@Injectable()
export class UserMapper {
  static toDomain(prismaUser: PrismaUser): DomainUser {
    const domainUser = new DomainUser({
      id: prismaUser.id,
      email: prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      fullName: prismaUser.fullName,
      role: prismaUser.role,
      isActive: prismaUser.isActive,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });

    return domainUser;
  }

  static toPersistence(domainUser: DomainUser): Prisma.UserCreateInput {
    return {
      id: domainUser.id,
      email: domainUser.email,
      passwordHash: domainUser.passwordHash,
      fullName: domainUser.fullName,
      role: domainUser.role,
      isActive: domainUser.isActive,
      createdAt: domainUser.createdAt,
    };
  }
}
