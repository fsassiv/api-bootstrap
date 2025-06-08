import { AuthQueueMessages } from '@app/common/constants';
import { SignUpDto } from '@app/dto/auth';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDocument } from '../user/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: AuthQueueMessages.SIGN_UP })
  register(@Payload() payload: SignUpDto): Promise<UserDocument> {
    return this.authService.register(payload);
  }

  @MessagePattern({ cmd: 'auth.ping' })
  getPong() {
    return 'pong';
  }
}
