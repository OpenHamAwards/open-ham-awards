export enum UserRole {
  REGISTERED_USER = 'registered_user',
  ADMIN = 'admin',
}

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
    role: UserRole,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.fullName = fullName;
    this.role = role;
    this.createdAt = createdAt;
  }
}
