import { AUTH_QUEUE_MESSAGES } from '@app/common';

import { CreateDefaultUserDto } from '@app/common/application/auth/dtos/create-user.dto';
import { User } from '@app/common/infrastructure/database/mongoose/schemas/auth/user.schema';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthDefaultUserUseCase } from '../../application/use-cases/default-user.use-case';

@Controller()
export class RegisterUserController {
  constructor(private authDefaultUserUseCase: AuthDefaultUserUseCase) {}

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.PING })
  getPong() {
    return 'pong';
  }

  @MessagePattern({ cmd: AUTH_QUEUE_MESSAGES.REGISTER_DEFAULT_USER })
  register(@Payload() payload: CreateDefaultUserDto): Promise<User> {
    return this.authDefaultUserUseCase.register(payload);
  }
}
