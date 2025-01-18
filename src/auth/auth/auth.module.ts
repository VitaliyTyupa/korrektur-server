import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [UserModule, PassportModule]
})
export class AuthModule {}
