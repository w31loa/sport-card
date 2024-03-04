import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [PrismaModule, AuthModule, FilesModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}

