import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { CreateDefaultUserService } from './application/services/create-default.service';
import { DefaultAuthController } from './controllers/default-auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [CreateDefaultUserService],
  controllers: [DefaultAuthController],
  exports: [],
})
export class AuthModule {}
