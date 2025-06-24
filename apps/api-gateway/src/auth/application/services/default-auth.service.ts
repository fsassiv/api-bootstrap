import {
  AUTH_QUEUE_MESSAGES,
  AUTH_SERVICE_CONSTANTS,
  handlePromise,
} from '@app/common';
import { CreateDefaultUserDto } from '@app/common/auth/application/dto';
import { User } from '@app/common/auth/infrastructure/schemas/user.schema';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class DefaultAuthService {
  constructor(
    @Inject(AUTH_SERVICE_CONSTANTS.AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async getPong(): Promise<string> {
    const [error, response] = await handlePromise<string>(
      firstValueFrom(
        this.authServiceClient
          .send<string>({ cmd: AUTH_QUEUE_MESSAGES.PING }, {})
          .pipe(timeout(5000)),
      ),
    );

    if (error) {
      throw new Error(error.message || 'Error occurred while getting pong');
    }
    return response;
  }

  async registerDefaultUser(data: CreateDefaultUserDto): Promise<User> {
    const [error, response] = await handlePromise<User>(
      firstValueFrom(
        this.authServiceClient
          .send<User>({ cmd: AUTH_QUEUE_MESSAGES.REGISTER_DEFAULT_USER }, data)
          .pipe(timeout(5000)),
      ),
    );

    if (error) {
      throw new BadRequestException(error.message);
    }
    return response;
  }

  // signIn(credentials: any) {
  //   return this.authServiceClient.signIn(credentials);
  // }

  // signOut(token: string) {
  //   return this.authServiceClient.signOut(token);
  // }

  // refreshToken(token: string) {
  //   return this.authServiceClient.refreshToken(token);
  // }

  // forgotPassword(email: string) {
  //   return this.authServiceClient.forgotPassword(email);
  // }

  // resetPassword(token: string, newPassword: string) {
  //   return this.authServiceClient.resetPassword(token, newPassword);
  // }

  // changePassword(oldPassword: string, newPassword: string) {
  //   return this.authServiceClient.changePassword(oldPassword, newPassword);
  // }
}
