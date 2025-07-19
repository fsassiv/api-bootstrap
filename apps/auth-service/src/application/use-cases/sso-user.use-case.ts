import { Injectable } from '@nestjs/common';
import { UserEntity } from 'apps/auth-service/src/domain/entities/user.entity';
import { AuthType } from 'apps/auth-service/src/domain/enums/auth-type.enum';
import { Role } from '../../domain/enums/role.enum';
import { UserRegistrationService } from '../services/user-registration.service';

@Injectable()
export class SsoUserUseCase {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
  ) {}

  async registerSsoUser(
    email: string,
    ssoProvider: string,
    ssoProviderId: string,
  ): Promise<UserEntity> {
    const entity = new UserEntity(
      null,
      email,
      null,
      [Role.USER],
      AuthType.SSO,
      false,
      null,
      [],
      ssoProvider,
      ssoProviderId,
      true,
    );

    return this.userRegistrationService.persistUser(entity);
  }
}
