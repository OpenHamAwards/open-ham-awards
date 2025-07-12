import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  constructor(email: string, password: string, fullName: string) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
