import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseDBConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    return {
      uri:
        this.configService.get<string>('MONGO_URI') ||
        'mongodb://localhost:27017',
      serverSelectionTimeoutMS: 30000,
      dbName: this.configService.get<string>('MONGO_INITDB_DATABASE'),
    };
  }
}
