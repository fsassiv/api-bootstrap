import { AUTH_QUEUE_MESSAGES } from '@app/common';
import { CreateDefaultUserDto } from '@app/common/auth/application/dto/create-user.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDefaultUserService } from '../application/services/create-default.service';

@Controller('auth/default')
export class DefaultAuthController {
  constructor(
    private readonly registerDefaultUserService: CreateDefaultUserService,
  ) {}

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.SIGN_UP })
  register(@Payload() payload: CreateDefaultUserDto) {
    return this.registerDefaultUserService.execute(payload);
  }

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.PING })
  getPong() {
    return 'pong';
  }
}
