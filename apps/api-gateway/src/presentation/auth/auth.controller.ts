import { CreateDefaultUserDto } from '@app/common/application/auth/dtos';

import { User } from '@app/common/infrastructure/database/mongoose/schemas/auth/user.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiDefaultAuthUseCase } from '../../application/use-cases/auth/default-auth.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly apiApiDefaultAuthUseCase: ApiDefaultAuthUseCase,
  ) {}

  @Get('ping')
  getPong(): Promise<string> {
    return this.apiApiDefaultAuthUseCase.getPong();
  }

  @Post('register')
  async register(@Body() data: CreateDefaultUserDto): Promise<User> {
    return this.apiApiDefaultAuthUseCase.registerDefaultUser(data);
  }
}
