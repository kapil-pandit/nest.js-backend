import { IsEmail, IsString } from 'class-validator';

export class VerifyOtpDto {

  email: string;

  otp: string;
}
