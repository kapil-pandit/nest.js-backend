import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @UsePipes(new ValidationPipe())
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<void> {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  @UsePipes(new ValidationPipe())
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    return this.authService.verifyOtp(verifyOtpDto);
  }
}
