import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '../../infrastructure/schemas/user.schema';

import { CreateDefaultUserDto } from '@app/common/auth/application/dto/create-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { generateHash } from '../../utils/auth.utils';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class CreateDefaultUserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async execute(dto: CreateDefaultUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hash = await generateHash(dto.password);

    const entity = new UserEntity(dto.email, hash);
    const persistence = UserMapper.toPersistence(entity);

    const user = new this.userModel(persistence);

    return user.save();
  }
}
