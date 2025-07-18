import { CreateDefaultUserDto } from '@app/common/auth/application/dto';
import { UserEntity } from '@app/common/auth/domain/entities/user.entity';
import { Role } from '@app/common/auth/domain/enums/role.enum';
import { User } from '@app/common/auth/infrastructure/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { generateHash } from '../../utils/auth.utils';
import { UserRegistrationService } from './user-registration.service';

@Injectable()
export class DefaultUserService {
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
