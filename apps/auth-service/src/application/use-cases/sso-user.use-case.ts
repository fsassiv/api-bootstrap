import { CreateSsoUserDto } from '@app/common/application/auth/dtos';

import { UserEntity } from '@app/common/domain/entities/auth/user.entity';
import { AuthType } from '@app/common/domain/enums/auth/auth-type.enum';
import { Role } from '@app/common/domain/enums/auth/role.enum';
import { User } from '@app/common/infrastructure/database/mongoose/schemas/auth/user.schema';
import { Injectable } from '@nestjs/common';
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
