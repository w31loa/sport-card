import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from './auth.config';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    JwtModule.registerAsync({
        imports:[ConfigModule],
        inject: [ConfigService],
        useFactory: getJwtConfig
    }),
    forwardRef(()=>UserModule),
    ConfigModule
  ],
  providers: [AuthService, AuthResolver],
  controllers: [AuthController],
  exports:[
    AuthService,
    JwtModule
  ],
  
})
export class AuthModule {}
