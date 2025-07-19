import { Module } from '@nestjs/common';
import { ApiDefaultAuthUseCase } from '../../application/use-cases/auth/default-auth.use-case';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [ApiDefaultAuthUseCase],
  exports: [],
})
export class ApiAuthModule {}
