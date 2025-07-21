import { Module } from '@nestjs/common';
import { PrismaClient } from '@open-ham-awards/db';
import { UsersController } from './adapters/users.controller';
import { PrismaUserRepository } from './adapters/users.repository';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { UsersService } from './services/users.service';
import { UserMapper } from './adapters/mappers/user.mapper';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserMapper,
    PrismaClient,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
