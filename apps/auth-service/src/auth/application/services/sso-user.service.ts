import { CreateSsoUserDto } from '@app/common/auth/application/dto';
import { UserEntity } from '@app/common/auth/domain/entities/user.entity';
import { AuthType } from '@app/common/auth/domain/enums/auth-type.enum';
import { User } from '@app/common/auth/infrastructure/schemas/user.schema';
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
      [],
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
