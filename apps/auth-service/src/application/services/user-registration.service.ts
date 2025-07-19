import { handlePromise } from '@app/common';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'apps/auth-service/src/domain/entities/user.entity';
import {
  User,
  UserModel,
} from 'apps/auth-service/src/infrasctructure/database/mongoose/schemas/user.schema';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRegistrationService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async ensureEmailNotExists(email: string): Promise<void> {
    const [error, user] = await handlePromise(
      this.userModel.findOne({ email }),
    );
    if (error) throw new BadRequestException(error);
    if (user) throw new ConflictException('User already exists');
  }

  async persistUser(entity: UserEntity): Promise<User> {
    const persistence = UserMapper.toPersistence(entity);
    const user = new this.userModel(persistence);

    const [error, newUser] = await handlePromise(user.save());

    // @ts-expect-error - MongooseError - Duplicate Key
    if (error?.code === 11000) {
      throw new BadRequestException('Email already exists');
    }

    if (!newUser) {
      throw new BadRequestException('Failed to create user');
    }

    return newUser;
  }
}
