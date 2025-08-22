import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { handlePromise } from '@app/common';
import { UserEntity } from 'apps/auth-service/src/domain/entities/user.entity';
import { IUserRepository } from 'apps/auth-service/src/domain/repositories/user.repository.interface';
import { UserMapper } from '../mapper/user.mapper';
import { User, UserModel } from '../schemas/user.schema';

@Injectable()
export class MongooseUserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await this.userModel.findOne({ email }).exec();
    return userDoc ? UserMapper.toDomain(userDoc) : null;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    const persistence = UserMapper.toPersistence(entity);
    const user = new this.userModel(persistence);

    const [error, newUserDoc] = await handlePromise(user.save());

    if (error) {
      if ((error as any)?.code === 11000) {
        // Duplicate key error
        throw new ConflictException('Email already exists');
      }
      throw new BadRequestException('Failed to create user');
    }
    return UserMapper.toDomain(newUserDoc);
  }
}
