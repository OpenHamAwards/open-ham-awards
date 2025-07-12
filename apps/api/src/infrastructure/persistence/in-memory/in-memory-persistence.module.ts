import { Module } from '@nestjs/common';
import { UserRepositoryPort, USER_REPOSITORY_PORT } from '../../../core/application/ports/out/user.repository.port';
import { InMemoryUserRepository } from './in-memory-user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY_PORT, // Provee la interfaz del puerto de salida
      useClass: InMemoryUserRepository, // Usa la implementación concreta
    },
  ],
  exports: [
    USER_REPOSITORY_PORT, // Exporta la provisión del puerto de salida
  ],
})
export class InMemoryPersistenceModule {}