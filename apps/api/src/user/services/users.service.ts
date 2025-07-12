import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(
    dto: CreateUserDto,
  ): Promise<Omit<User, 'passwordHash'> | undefined> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const passwordHash: string = await bcrypt.hash(dto.password, 10);

    const newUser = new User(
      randomUUID(),
      dto.email,
      dto.fullName,
      passwordHash,
      new Date(),
    );
    const savedUser = await this.userRepository.save(newUser);

    const { passwordHash: _, ...result } = savedUser;

    return result;
  }
}
