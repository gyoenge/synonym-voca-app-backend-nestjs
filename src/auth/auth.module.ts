import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config'
import { UserRepository } from './user.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
