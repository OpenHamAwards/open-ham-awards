import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as DomainUser } from '../../../core/domain/user.entity';
import { UserRepositoryPort } from '../../../core/application/ports/out/user.repository.port';
import { UserTypeOrmEntity } from './user.typeorm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserTypeOrmEntity)
    private readonly userRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<DomainUser | null> {
    const userEntity = await this.userRepository.findOne({ where: { id } });
    return userEntity ? UserTypeOrmEntity.toDomain(userEntity) : null;
  }

  async save(user: DomainUser): Promise<void> {
    const userEntity = UserTypeOrmEntity.fromDomain(user);
    await this.userRepository.save(userEntity); // TypeORM gestionará createdAt/updatedAt
  }

  async findAll(): Promise<DomainUser[]> {
    const userEntities = await this.userRepository.find();
    return userEntities.map(UserTypeOrmEntity.toDomain);
  }
}