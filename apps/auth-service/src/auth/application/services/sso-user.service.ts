import { CreateSsoUserDto } from '@app/common/application/auth/dtos';

import { UserEntity } from '@app/common/domain/auth/entities/user.entity';
import { AuthType } from '@app/common/domain/auth/enums/auth-type.enum';
import { Role } from '@app/common/domain/auth/enums/role.enum';
import { User } from '@app/common/infrastructure/database/mongoose/auth/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';

@Injectable()
export class RegisterSsoService {
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
