import { AUTH_QUEUE_MESSAGES } from '@app/common';
import { CreateDefaultUserDto } from '@app/common/auth/application/dto';
import { User } from '@app/common/auth/infrastructure/schemas/user.schema';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DefaultUserService } from '../application/services/default-user.service';

@Controller()
export class RegisterUserController {
  constructor(private defaultUserService: DefaultUserService) {}

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.PING })
  getPong() {
    return 'pong';
  }

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.REGISTER_DEFAULT_USER })
  register(@Payload() payload: CreateDefaultUserDto): Promise<User> {
    return this.defaultUserService.register(payload);
  }
}
