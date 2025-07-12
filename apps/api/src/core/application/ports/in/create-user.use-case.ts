import { User } from '../../../domain/user.entity';

export interface CreateUserCommand {
    full_name: string;
    email: string;
    password_hash: string;
    // member_since: Timestamp;
    member_id_club: string;
    profile_info: string;
    // created_at: Timestamp;
    // updated_at: Timestamp;
}

// Interfaz que el controlador "llama"
export abstract class CreateUserUseCase {
  abstract execute(command: CreateUserCommand): Promise<User>;
}

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE'; // Token para inyección