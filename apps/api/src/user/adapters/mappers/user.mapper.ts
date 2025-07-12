import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { User as DomainUser, UserRole } from '../../domain/user.entity';

@Injectable()
export class UserMapper {
  static toDomain(prismaUser: PrismaUser): DomainUser {
    const domainUser = new DomainUser(
      prismaUser.id,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.fullName,
      prismaUser.role as UserRole,
      prismaUser.createdAt
    );

    return domainUser;
  }

  static toPersistence(domainUser: DomainUser) {
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

