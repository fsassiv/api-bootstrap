import { handlePromise } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserModel } from '../user/user.schema';
import { generateHash } from './auth.utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: UserModel) {}

  async register(payload: {
    email: string;
    password: string;
  }): Promise<UserDocument> {
    const { email, password } = payload;

    const newCredetials = new this.UserModel({
      email,
      hash: await generateHash(password),
    });

    const [findEmailError, findEmailResponse] = await handlePromise(
      this.UserModel.findOne({ email }),
    );

    if (findEmailError) throw new BadRequestException(findEmailError);

    const [error, newUser] = await handlePromise(newCredetials.save());
    // @ts-expect-error - MongooseError - Duplicate Key
    if (error?.code === 11000 || findEmailResponse) {
      throw new BadRequestException('Email already exists');
    }

    if (!newUser) {
      throw new BadRequestException('Failed to create user');
    }

    return newUser;
  }

  login() {}

  logout() {}

  refreshToken() {}

  forgotPassword() {}

  resetPassword() {}

  changePassword() {}
}
