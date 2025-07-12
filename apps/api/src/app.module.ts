import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './infrastructure/web/user.controller';
import { UserCoreModule } from './core/user.module';
//import { InMemoryPersistenceModule } from './infrastructure/persistence/in-memory/in-memory-persistence.module';
import { TypeOrmPersistenceModule } from './infrastructure/persistence/typeorm/typeorm-persistence.module';
import { UserTypeOrmEntity } from './infrastructure/persistence/typeorm/user.typeorm-entity'; // Importa tu entidad de TypeORM

@Module({
  imports: [
    TypeOrmModule.forRoot({ // Configuración de la conexión a la base de datos
      type: 'sqlite', // O 'postgres', 'mysql', etc.
      database: 'db.sqlite', // Nombre del archivo de la base de datos (para sqlite)
      entities: [UserTypeOrmEntity], // Tus entidades TypeORM
      synchronize: true, // Auto-sincronizar esquema (solo para desarrollo)
      logging: ['query', 'error']
    }),
    UserCoreModule, // Importamos los casos de uso (puertos de entrada)
    TypeOrmPersistenceModule, // Importamos las implementaciones de los puertos de salida
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})

export class AppModule {}
