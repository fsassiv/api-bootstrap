import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongoDBModule } from './mongodb/mongodb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDBModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthMSModule {}
