import { AUTH_QUEUE_MESSAGES } from '@app/common';
import { SignUpDto } from '@app/dto/auth';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDocument } from '../user/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.SIGN_UP })
  register(@Payload() payload: SignUpDto): Promise<UserDocument> {
    return this.authService.register(payload);
  }

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.PING })
  getPong() {
    return 'pong';
  }
}
