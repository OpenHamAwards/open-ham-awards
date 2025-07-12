import { Module } from '@nestjs/common';
import { CREATE_USER_USE_CASE, CreateUserUseCase } from './application/ports/in/create-user.use-case';
import { CreateUserUseCaseImpl } from './application/use-cases/create-user.use-case';
import { GET_USER_BY_ID_USE_CASE, GetUserByIdUseCase } from './application/ports/in/get-user-by-id.use-case'; 
import { GetUserByIdUseCaseImpl } from './application/use-cases/get-user-by-id.use-case'; 
import { InMemoryPersistenceModule } from '../infrastructure/persistence/in-memory/in-memory-persistence.module';

//import { USER_REPOSITORY_PORT } from './application/ports/out/user.repository.port';

@Module({
  imports: [
    // 💡 Asegúrate de importar el módulo que PROVEE el UserRepositoryPort
    InMemoryPersistenceModule,
  ],
  providers: [
    // El caso de uso es un proveedor que implementa un puerto de entrada
    {
      provide: CREATE_USER_USE_CASE, // Provee la interfaz
      useClass: CreateUserUseCaseImpl, // Usa la implementación concreta
    },
    {
      provide: GET_USER_BY_ID_USE_CASE, 
      useClass: GetUserByIdUseCaseImpl,
    },
    
  ],
  exports: [
    CREATE_USER_USE_CASE, // Exportamos el puerto de entrada para que otros módulos lo inyecten
    GET_USER_BY_ID_USE_CASE,
  ],
})

export class UserCoreModule {}