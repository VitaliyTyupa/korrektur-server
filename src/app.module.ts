import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatgptModule } from './chatgpt/chatgpt/chatgpt.module';
import { AuthModule } from './auth/auth/auth.module';

@Module({
  imports: [ChatgptModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
