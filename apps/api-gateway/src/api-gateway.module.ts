import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { KeyvRedisCacheModule } from './cache';
import { LoggerMiddleware } from './middleware';
import { TcpModule } from './tcp/tcp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // RmqModule,
    KeyvRedisCacheModule,
    AuthModule,
    TcpModule,
    // CacheConfigModule, // Uncomment if using CacheModule with cache-manager-redis-store
  ],
  controllers: [],
  providers: [],
})
export class ApiBootstrapModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
