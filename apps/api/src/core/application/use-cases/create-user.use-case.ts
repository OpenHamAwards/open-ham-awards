import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { CreateUserCommand, CreateUserUseCase } from '../ports/in/create-user.use-case';
import { UserRepositoryPort, USER_REPOSITORY_PORT } from '../ports/out/user.repository.port';


@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}


  async execute(command: CreateUserCommand): Promise<User> {
    if (!command.full_name || !command.email) {
      throw new Error('Name and email are required.');
    }

    const newUser = new User(
      Math.random().toString(36).substring(2, 9),
      command.full_name,
      command.email,
      command.password_hash,
      command.member_id_club,
      command.profile_info,
    );

    await this.userRepository.save(newUser);
    return newUser;
  }
}