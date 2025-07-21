import { UserRole } from '@open-ham-awards/db';
import { randomUUID } from 'crypto';

export { UserRole };

export class User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

  constructor({
    id,
    email,
    passwordHash,
    fullName,
    role,
    isActive,
    createdAt,
    updatedAt,
  }: {
    id?: string;
    email: string;
    passwordHash: string;
    fullName: string;
    role?: UserRole;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id || randomUUID();
    this.email = email;
    this.passwordHash = passwordHash;
    this.fullName = fullName;
    this.role = role || UserRole.REGISTERED_USER;

    const now = new Date();
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;

    this.isActive = isActive || false;
  }
}
