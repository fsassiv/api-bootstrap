import { Module } from '@nestjs/common';
import { DefaultAuthService } from './application/services/default-auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [DefaultAuthService],
  exports: [],
})
export class AuthModule {}
