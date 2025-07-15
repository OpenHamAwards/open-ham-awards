import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../services/dto/create-user.dto';
import { UserResponseDto } from '../services/dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createUser(createUserDto);
    return plainToInstance(UserResponseDto, createdUser);
  }

  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAllUsers();
    return plainToInstance(UserResponseDto, users);
  }
}
