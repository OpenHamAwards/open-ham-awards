import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { GetUserByIdUseCase, GetUserByIdQuery } from '../ports/in/get-user-by-id.use-case';
import { UserRepositoryPort, USER_REPOSITORY_PORT } from '../ports/out/user.repository.port';

@Injectable()
export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    if (!query.id) {
      throw new Error('User ID is required.');
    }
    return this.userRepository.findById(query.id);
  }
}