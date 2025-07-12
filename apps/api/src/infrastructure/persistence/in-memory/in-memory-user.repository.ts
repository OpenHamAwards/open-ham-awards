import { Injectable } from '@nestjs/common';
import { User } from '../../../core/domain/user.entity';
import { UserRepositoryPort } from '../../../core/application/ports/out/user.repository.port';

const usersInMemory: User[] = [
  new User('1', 'Alice Smith', 'alice@example.com', 'xxxxxx', '', ''),
  new User('2', 'Bob Johnson', 'bob@example.com', 'xxxxxx', '', ''),
];

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  async findById(id: string): Promise<User | null> {
    return usersInMemory.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<void> {
    const existingIndex = usersInMemory.findIndex(u => u.id === user.id);
    if (existingIndex > -1) {
      usersInMemory[existingIndex] = user;
    } else {
      usersInMemory.push(user);
    }
    console.log('User saved/updated in memory:', user);
  }

  async findAll(): Promise<User[]> {
    return [...usersInMemory]; // Devolver una copia para evitar mutaciones externas
  }

}