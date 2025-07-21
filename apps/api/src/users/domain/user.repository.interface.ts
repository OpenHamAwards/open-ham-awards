import { User } from './user.entity';

export const USER_REPOSITORY = 'IUserRepository';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
