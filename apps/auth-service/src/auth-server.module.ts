import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from './infrasctructure/database/mongodb/mongodb.module';
import { AuthModule } from './presentation/auth.module';

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
export class AuthServerModule {}
