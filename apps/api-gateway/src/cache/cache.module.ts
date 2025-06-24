import { API_SERVICE_CONSTANTS } from '@app/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: parseInt(configService.get<string>('REDIS_PORT')!),
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule, API_SERVICE_CONSTANTS.CACHE_INSTANCE],
})
export class CacheConfigModule {}
