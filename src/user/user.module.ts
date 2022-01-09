import { PrismaService } from './../prisma.service';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
