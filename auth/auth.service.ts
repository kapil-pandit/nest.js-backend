import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { User } from './entities/user.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto): Promise<void> {
    const { email } = sendOtpDto;

    // Check if user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new Error('User already exists, please login');
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    const currentDate = new Date();
    const expiryTime = new Date(currentDate.getTime() + 10 * 60000); // 10 minutes later

    const newOtp = this.otpRepository.create({
      email,
      otp,
      createdAt: currentDate,
      expiryTime,
      status: true,
    });
    console.log("::::::: newOtp ::::::::", newOtp);
    
    await this.otpRepository.save(newOtp);
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<User> {
    const { email, otp } = verifyOtpDto;

    const otpRecord = await this.otpRepository.findOne({ where: { email, otp, status: true } });
    if (!otpRecord) {
      throw new Error('Invalid OTP or email');
    }

    const currentTime = new Date();
    if (currentTime > otpRecord.expiryTime) {
      throw new Error('OTP has expired');
    }

    const user = this.userRepository.create({
      email,
      password: '',
      active: false,
    });

    await this.otpRepository.update(otpRecord.id, { status: false });
    return await this.userRepository.save(user);
  }
}
