import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FormBuilderModule } from './form-builder/form-builder.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AiFactoryModule } from './ai-factory/ai-factory.module';
import { TextModule } from './text/text.module';
import { LogModule } from './log/log.module';
import mongodbConfig from './database/mongodb.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongodbConfig],
    }),
    DatabaseModule,
    AiFactoryModule,
    AuthModule,
    FormBuilderModule,
    UserModule,
    TextModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
