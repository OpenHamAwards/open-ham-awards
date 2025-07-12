import { User } from '../../../domain/user.entity';

// Interfaz que el caso de uso "invoca"
export abstract class UserRepositoryPort {
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>; // Añadido para el ejemplo de listar
}

export const USER_REPOSITORY_PORT = 'USER_REPOSITORY_PORT'; // Token para inyección