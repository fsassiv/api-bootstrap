import {
  ApiServiceContants,
  AuthServiceConstants,
  handlePromise,
} from '@app/common';
import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject(AuthServiceConstants.AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    @Inject(ApiServiceContants.CACHE_INSTANCE) private cacheManagerNest: Cache,
  ) {}

  @Get('auth')
  async getAuthHello(): Promise<string> {
    const cacheKey = 'auth_hello';

    const cachedData = await this.cacheManagerNest.get<string>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [error, data] = await handlePromise<string>(
      firstValueFrom(
        this.authServiceClient
          .send<string>({ cmd: 'test_auth_service' }, {})
          .pipe(timeout(5000)),
      ),
    );

    if (error) {
      throw new BadRequestException(error);
    }

    await this.cacheManagerNest.set(cacheKey, data);

    return data;
  }

  @Get('health')
  health(): string {
    return 'API Gateway is healthy!';
  }
}
