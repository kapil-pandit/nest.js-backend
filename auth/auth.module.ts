import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Otp } from './entities/otp.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
