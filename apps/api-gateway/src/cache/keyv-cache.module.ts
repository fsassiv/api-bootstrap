import { ApiServiceContants } from '@app/common';
import KeyvRedis from '@keyv/redis';
import { Global, Module } from '@nestjs/common';
import Keyv from 'keyv';

@Global()
@Module({
  providers: [
    {
      provide: ApiServiceContants.CACHE_INSTANCE,
      useValue: new Keyv(
        new KeyvRedis(process.env.REDIS_URL || 'redis://redis:6379'),
        { ttl: 1000 * 60, namespace: 'api-gateway' },
      ),
    },
  ],
  exports: [ApiServiceContants.CACHE_INSTANCE],
})
export class KeyvRedisCacheModule {}
