import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { ConfigModule } from '@nestjs/config';
import dynamodbConfig from './dynamodb/dynamodb.config';
import { DynamodbService } from './dynamodb/dynamodb.service';
import { UserModule } from './user/user.module';
import { AiFactoryModule } from './ai-factory/ai-factory.module';

@Module({
  imports: [
    AiFactoryModule,
    AuthModule,
    FormBuilderModule,
    ConfigModule.forRoot({
      load: [dynamodbConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, DynamodbService],
})
export class AppModule {}
