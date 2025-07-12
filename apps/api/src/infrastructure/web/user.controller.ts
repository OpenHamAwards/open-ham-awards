import { Controller, Post, Body, Inject, Get, Param, NotFoundException } from '@nestjs/common';
import { CreateUserCommand, CreateUserUseCase, CREATE_USER_USE_CASE } from '../../core/application/ports/in/create-user.use-case';
import { GetUserByIdUseCase, GET_USER_BY_ID_USE_CASE, GetUserByIdQuery } from '../../core/application/ports/in/get-user-by-id.use-case'; 
import { User } from '../../core/domain/user.entity';
import { UserRepositoryPort, USER_REPOSITORY_PORT } from '../../core/application/ports/out/user.repository.port'; // Para el ejemplo de findAll

@Controller('users')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(GET_USER_BY_ID_USE_CASE) 
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    @Inject(USER_REPOSITORY_PORT) // Inyectamos el puerto del repositorio directamente para findAll, idealmente sería otro use case
    private readonly userRepository: UserRepositoryPort,
  ) { }

  @Post()
  async createUser(@Body() command: CreateUserCommand): Promise<User> {
    return this.createUserUseCase.execute(command);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Get(':id') // ⬅️ Este es el decorador que mapea la URL GET /users/:id
  async getById(@Param('id') id: string): Promise<User> {
    // Extraemos el 'id' de los parámetros de la URL
    const query: GetUserByIdQuery = { id };

    // Invocamos el caso de uso del CORE para obtener el usuario
    const user = await this.getUserByIdUseCase.execute(query);

    // Si el usuario no se encuentra, lanzamos una excepción HTTP 404
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    // Devolvemos el usuario encontrado
    return user;
  }
}