import { CreateDefaultUserDto } from '@app/common/application/auth/dtos';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { ApiDefaultAuthUseCase } from '../../application/use-cases/auth/default-auth.use-case';

@Controller('auth')
export class ApiAuthController {
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
