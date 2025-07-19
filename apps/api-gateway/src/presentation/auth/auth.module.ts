import { Module } from '@nestjs/common';
import { ApiDefaultAuthUseCase } from '../../application/use-cases/auth/default-auth.use-case';
import { ApiAuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [ApiAuthController],
  providers: [ApiDefaultAuthUseCase],
  exports: [],
})
export class ApiAuthModule {}
