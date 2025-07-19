import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../../shared/constants/injection-tokens';

@Injectable()
export class UserRegistrationService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}
  async ensureEmailNotExists(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
  }

  async persistUser(entity: UserEntity): Promise<UserEntity> {
    return this.userRepository.create(entity);
  }
}
