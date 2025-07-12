import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'A valid email address must be provided.' })
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name cannot be empty.' })
  fullName: string;

  constructor(email: string, password: string, fullName: string) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
