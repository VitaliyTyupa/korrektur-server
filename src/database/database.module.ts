import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  FORM_REPOSITORY,
  LOG_REPOSITORY,
  TEXT_REPOSITORY,
  TOKEN_USAGE_REPOSITORY,
  USER_REPOSITORY,
} from './database.constants';
import { UserEntity, UserSchema } from './mongo/schemas/user.schema';
import { TextEntity, TextSchema } from './mongo/schemas/text.schema';
import { LogEntity, LogSchema } from './mongo/schemas/log.schema';
import {
  TokenUsageEntity,
  TokenUsageSchema,
} from './mongo/schemas/token-usage.schema';
import { FormEntity, FormSchema } from './mongo/schemas/form.schema';
import { UserMongoRepository } from './mongo/repositories/user.mongo.repository';
import { TextMongoRepository } from './mongo/repositories/text.mongo.repository';
import { LogMongoRepository } from './mongo/repositories/log.mongo.repository';
import { TokenUsageMongoRepository } from './mongo/repositories/token-usage.mongo.repository';
import { FormMongoRepository } from './mongo/repositories/form.mongo.repository';

@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
      }),
    }),
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: TextEntity.name, schema: TextSchema },
      { name: LogEntity.name, schema: LogSchema },
      { name: TokenUsageEntity.name, schema: TokenUsageSchema },
      { name: FormEntity.name, schema: FormSchema },
    ]),
  ],
  providers: [
    UserMongoRepository,
    TextMongoRepository,
    LogMongoRepository,
    TokenUsageMongoRepository,
    FormMongoRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: UserMongoRepository,
    },
    {
      provide: TEXT_REPOSITORY,
      useExisting: TextMongoRepository,
    },
    {
      provide: LOG_REPOSITORY,
      useExisting: LogMongoRepository,
    },
    {
      provide: TOKEN_USAGE_REPOSITORY,
      useExisting: TokenUsageMongoRepository,
    },
    {
      provide: FORM_REPOSITORY,
      useExisting: FormMongoRepository,
    },
  ],
  exports: [
    USER_REPOSITORY,
    TEXT_REPOSITORY,
    LOG_REPOSITORY,
    TOKEN_USAGE_REPOSITORY,
    FORM_REPOSITORY,
  ],
})
export class DatabaseModule {}
