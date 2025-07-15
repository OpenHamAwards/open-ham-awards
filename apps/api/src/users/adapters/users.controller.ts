import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../services/dto/create-user.dto';
import { UserResponseDto } from '../services/dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createUser(createUserDto);
    return new UserResponseDto(createdUser);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAllUsers();
    return users.map((user) => new UserResponseDto(user));
  }
}
