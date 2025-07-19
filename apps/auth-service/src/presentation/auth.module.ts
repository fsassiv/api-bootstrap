import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { UserRegistrationService } from '../application/services/user-registration.service';
import { AuthDefaultUserUseCase } from '../application/use-cases/default-user.use-case';
import { BcryptAuthUtilsService } from '../infrasctructure/auth/auth-utils.service';
import { MongooseUserRepository } from '../infrasctructure/database/mongoose/repositories/user.repository';
import {
  AUTH_UTILS_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../shared/constants/injection-tokens';
import { AuthDefaultUserController } from './controllers/register-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: MongooseUserRepository,
    },
    {
      provide: AUTH_UTILS_SERVICE_TOKEN,
      useClass: BcryptAuthUtilsService,
    },
    AuthDefaultUserUseCase,
    UserRegistrationService,
  ],
  controllers: [AuthDefaultUserController],
  exports: [
    AuthDefaultUserUseCase,
    USER_REPOSITORY_TOKEN,
    AUTH_UTILS_SERVICE_TOKEN,
    UserRegistrationService,
  ],
})
export class AuthModule {}
