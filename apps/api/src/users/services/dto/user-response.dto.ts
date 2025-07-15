import { UserRole } from '@open-ham-awards/db';

import { User } from '../../domain/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  role: UserRole;

  @Expose()
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
    this.role = user.role;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
  }
}
