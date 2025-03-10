import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from '../guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // todo: need to be updated to short time with refresh token
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
