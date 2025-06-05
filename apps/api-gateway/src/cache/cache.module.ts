import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        url: 'redis://redis:6379',
        ttl: 0,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
