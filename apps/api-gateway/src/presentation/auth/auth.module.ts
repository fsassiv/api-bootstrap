import { Module } from '@nestjs/common';
import { DefaultAuthUseCase } from '../../application/use-cases/auth/default-auth.use-case';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [DefaultAuthUseCase],
  exports: [],
})
export class ApiAuthModule {}
