import { CreateDefaultUserDto } from '@app/common/auth/application/dto';
import { User } from '@app/common/auth/infrastructure/schemas/user.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DefaultAuthService } from '../application/services/default-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: DefaultAuthService) {}

  @Get('ping')
  getPong(): Promise<string> {
    return this.authService.getPong();
  }

  @Post('register')
  async register(@Body() data: CreateDefaultUserDto): Promise<User> {
    return this.authService.registerDefaultUser(data);
  }
}
