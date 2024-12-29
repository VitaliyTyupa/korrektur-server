import { Module } from '@nestjs/common';
import { FormBuilderController } from './form-builder.controller';
import { FormBuilderService } from './form-builder.service';
import { DynamodbService } from '../common-services/dynamodb/dynamodb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FormBuilderController],
  providers: [FormBuilderService, DynamodbService],
})
export class FormBuilderModule {}
