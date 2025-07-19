import { CreateSsoUserDto } from '@app/common/application/auth/dtos';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'apps/auth-service/src/domain/entities/user.entity';
import { AuthType } from 'apps/auth-service/src/domain/enums/auth-type.enum';
import { User } from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { Role } from '../../domain/enums/role.enum';
import { UserRegistrationService } from '../services/user-registration.service';

@Injectable()
export class AuthRegisterSsoUseCase {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
  ) {}

  async register(dto: CreateSsoUserDto): Promise<User> {
    const { email, provider, providerId, ssoEmailVerified } = dto;

    await this.userRegistrationService.ensureEmailNotExists(email);

    const entity = new UserEntity(
      email,
      null,
      [Role.USER],
      AuthType.SSO,
      false,
      null,
      [],
      provider,
      providerId,
      ssoEmailVerified,
    );

    return this.userRegistrationService.persistUser(entity);
  }
}
