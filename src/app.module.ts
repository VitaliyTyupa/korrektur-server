import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { ConfigModule } from '@nestjs/config';
import dynamodbConfig from '../config/dynamodb.config';
import { DynamodbService } from './common-services/dynamodb/dynamodb.service';
import { AiFactoryModule } from './ai-factory/ai-factory.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AiFactoryModule,
    AuthModule,
    FormBuilderModule,
    ConfigModule.forRoot({
      load: [dynamodbConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DynamodbService],
})
export class AppModule {}
