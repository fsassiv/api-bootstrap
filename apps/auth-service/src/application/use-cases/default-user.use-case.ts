import { CreateDefaultUserDto } from '@app/common/application/auth/dtos';
import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { Role } from '../../domain/enums/role.enum';
import { AUTH_UTILS_SERVICE_TOKEN } from '../../shared/constants/injection-tokens';
import { IAuthUtilsService } from '../ports/auth-utils.service.port';
import { UserRegistrationService } from '../services/user-registration.service';

@Injectable()
export class AuthDefaultUserUseCase {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
    @Inject(AUTH_UTILS_SERVICE_TOKEN)
    private readonly authUtilsService: IAuthUtilsService,
  ) {}

  async register(dto: CreateDefaultUserDto): Promise<UserEntity> {
    const { email, password } = dto;

    await this.userRegistrationService.ensureEmailNotExists(email);

    const hash = await this.authUtilsService.hashPassword(password);
    const entity = new UserEntity(null, email, hash, [Role.USER]);

    return this.userRegistrationService.persistUser(entity);
  }
}
