import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { UserRegistrationService } from '../application/services/user-registration.service';
import { AuthDefaultUserUseCase } from '../application/use-cases/default-user.use-case';
import { RegisterUserController } from './controllers/register-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthDefaultUserUseCase, UserRegistrationService],
  controllers: [RegisterUserController],
  exports: [],
})
export class AuthModule {}
