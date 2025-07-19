import { CreateDefaultUserDto } from '@app/common/application/auth/dtos';

import { Injectable } from '@nestjs/common';
import { UserEntity } from 'apps/auth-service/src/domain/entities/user.entity';
import { Role } from 'apps/auth-service/src/domain/enums/role.enum';
import { User } from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { generateHash } from '../../infrasctructure/utils/auth.utils';
import { UserRegistrationService } from '../services/user-registration.service';

@Injectable()
export class AuthDefaultUserUseCase {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
  ) {}

  async register(dto: CreateDefaultUserDto): Promise<User> {
    const { email, password } = dto;

    await this.userRegistrationService.ensureEmailNotExists(email);

    const hash = await generateHash(password);
    const entity = new UserEntity(email, hash, [Role.USER]);

    return this.userRegistrationService.persistUser(entity);
  }
}
