import { Injectable } from '@nestjs/common';
import { User as PrismaUser, Prisma } from '@open-ham-awards/db';
import { User as DomainUser } from '../../domain/user.entity';

@Injectable()
export class UserMapper {
  static toDomain(prismaUser: PrismaUser): DomainUser {
    const domainUser = new DomainUser(
      prismaUser.id,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.fullName,
      prismaUser.createdAt,
      prismaUser.role,
    );

    return domainUser;
  }

  static toPersistence(domainUser: DomainUser): Prisma.UserCreateInput {
    return {
      id: domainUser.id,
      email: domainUser.email,
      passwordHash: domainUser.passwordHash,
      fullName: domainUser.fullName,
      role: domainUser.role,
      createdAt: domainUser.createdAt,
    };
  }
}
