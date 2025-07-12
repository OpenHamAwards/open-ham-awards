import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryPort, USER_REPOSITORY_PORT } from '../../../core/application/ports/out/user.repository.port';
import { TypeOrmUserRepository } from './typeorm-user.repository';
import { UserTypeOrmEntity } from './user.typeorm-entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTypeOrmEntity]), // Registra la entidad para TypeORM
        // Aquí iría la configuración de la conexión a la base de datos si no está en el AppModule
    ],
    providers: [
        {
            provide: USER_REPOSITORY_PORT,
            useClass: TypeOrmUserRepository,
        },
    ],
    exports: [USER_REPOSITORY_PORT],
})
export class TypeOrmPersistenceModule { }