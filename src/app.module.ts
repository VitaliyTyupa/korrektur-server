import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptModule } from './chatgpt/chatgpt/chatgpt.module';
import { AuthModule } from './auth/auth/auth.module';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { ConfigModule } from '@nestjs/config';
import dynamodbConfig from '../config/dynamodb.config';
import { DynamodbService } from './common-services/dynamodb/dynamodb.service';

@Module({
  imports: [
    ChatgptModule,
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
