import {
  User,
  UserSchema,
} from '@app/common/infrastructure/database/mongoose/auth/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DefaultUserService } from './application/services/default-user.service';
import { UserRegistrationService } from './application/services/user-registration.service';
import { RegisterUserController } from './controllers/register-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [DefaultUserService, UserRegistrationService],
  controllers: [RegisterUserController],
  exports: [],
})
export class AuthModule {}
