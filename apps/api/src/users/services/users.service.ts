import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../domain/user.repository.interface';
import { User as DomainUser } from '../domain/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<DomainUser> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    // TODO: Move to its own adapter
    const passwordHash: string = await bcrypt.hash(dto.password, 10);

    const newUser = new DomainUser({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
      isActive: true,
    });

    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<DomainUser[]> {
    return this.userRepository.getAllUsers();
  }
}
