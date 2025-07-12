import { User } from '../../../domain/user.entity';

export interface GetUserByIdQuery {
  id: string;
}

export abstract class GetUserByIdUseCase {
  abstract execute(query: GetUserByIdQuery): Promise<User | null>;
}

export const GET_USER_BY_ID_USE_CASE = 'GET_USER_BY_ID_USE_CASE';