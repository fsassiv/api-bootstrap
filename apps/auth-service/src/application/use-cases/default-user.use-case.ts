import { CreateDefaultUserDto } from '@app/common/application/auth/dtos';

import { UserEntity } from '@app/common/domain/entities/auth/user.entity';
import { Role } from '@app/common/domain/enums/auth/role.enum';
import { User } from '@app/common/infrastructure/database/mongoose/schemas/auth/user.schema';
import { Injectable } from '@nestjs/common';
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
