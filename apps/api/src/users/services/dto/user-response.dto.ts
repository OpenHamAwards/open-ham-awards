import { UserRole } from '@open-ham-awards/db';

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
}
