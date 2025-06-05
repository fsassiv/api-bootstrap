import { SignUpDto } from '@app/dto/auth';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ping')
  getPong(): Promise<string> {
    return this.authService.getPong();
  }

  @Post('register')
  async register(@Body() data: SignUpDto): Promise<string> {
    return this.authService.register(data);
  }
}
