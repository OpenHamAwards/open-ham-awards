import { UserRole } from '@open-ham-awards/db';

export { UserRole };

export class User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;

  constructor(
    id: string,
    email: string,
    passwordHash: string,
    fullName: string,
    createdAt: Date,
    role?: UserRole,
  ) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.fullName = fullName;
    this.role = role || UserRole.REGISTERED_USER;
    this.createdAt = createdAt;
  }
}
