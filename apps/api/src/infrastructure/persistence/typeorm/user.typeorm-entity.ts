import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User as DomainUser } from '../../../core/domain/user.entity'; // Importamos la entidad de dominio

@Entity('users') // Nombre de la tabla en la base de datos
export class UserTypeOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  full_name!: string;

  @Column()
  email!: string;

  @Column()
  password_hash!: string;

  @Column()
  member_id_club!: string;

  @Column()
  profile_info!: string;

  @CreateDateColumn({ name: 'created_at' }) // Crea el campo 'created_at' y lo llena automáticamente al insertar
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Crea el campo 'updated_at' y lo actualiza automáticamente al modificar
  updated_at!: Date;

  // Métodos para convertir entre la entidad de dominio y la entidad de TypeORM
  static toDomain(typeOrmEntity: UserTypeOrmEntity): DomainUser {
    return new DomainUser(typeOrmEntity.id, typeOrmEntity.full_name, typeOrmEntity.email, typeOrmEntity.password_hash, typeOrmEntity.member_id_club, typeOrmEntity.profile_info);
    // createdAt y updatedAt se mapean automáticamente si el constructor de DomainUser los acepta
    // o se asignan directamente si no hay un constructor estricto
  }

  static fromDomain(domainUser: DomainUser): UserTypeOrmEntity {
    const entity = new UserTypeOrmEntity();
    entity.id = domainUser.id;
    entity.full_name = domainUser.full_name;
    entity.email = domainUser.email;
    entity.password_hash = domainUser.password_hash;
    entity.member_id_club = domainUser.member_id_club;
    entity.profile_info = domainUser.profile_info;
    // createdAt y updatedAt no se asignan aquí, TypeORM los gestionará
    return entity;
  }
}