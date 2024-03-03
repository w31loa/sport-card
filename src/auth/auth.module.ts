import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from './auth.config';

@Module({
  imports:[
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject: [ConfigService],
        useFactory: getJwtConfig
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
