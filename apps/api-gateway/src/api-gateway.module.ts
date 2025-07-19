import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TcpModule } from './infrastructure/clients/auth-service/tcp.module';
import { KeyvRedisCacheModule } from './infrastructure/config/redis';
import { LoggerMiddleware } from './infrastructure/middleware';
import { ApiAuthModule } from './presentation/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RmqModule,
    KeyvRedisCacheModule,
    ApiAuthModule,
    TcpModule,
    // CacheConfigModule, // Uncomment if using CacheModule with cache-manager-redis-store
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
