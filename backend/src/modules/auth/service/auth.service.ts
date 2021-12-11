import { LoginDTO } from './../dto/login.dto';
import { responceData } from './../../../utils/responce-data.util';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import { ForgetPasswordDTO } from '../dto/forgetPassword.dto';
import { OTP } from 'src/utils/otpGenerate.util';
import { VerificationDTO } from '../dto/verification.dto';
import { hashedPassword } from 'src/utils/bcript.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userCredential: SignUpDTO) {
    try {
      userCredential.password = await hashedPassword(userCredential.password);
      const user = await this.userRepository.save(userCredential);

      return responceData('Sign Up Success', HttpStatus.CREATED);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User Already Exist');
      }
      throw new InternalServerErrorException();
    }
  }

  async signin(userCredential: LoginDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userCredential.email },
        select: ['id', 'email', 'password'],
      });

      if (user && (await user.comparePassword(userCredential.password))) {
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);

        return responceData('Login Success', HttpStatus.OK, { token });
      }

      return new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async forgetPassword(userCredential: ForgetPasswordDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userCredential.email },
        select: ['id', 'email'],
      });

      if (!user) {
        return new NotFoundException('User Not Found');
      }

      const otp = OTP.createOtp(6);
      const updateRes = await this.userRepository.update(user.id, {
        otp: otp,
      });

      // add send email code here

      if (updateRes.affected) {
        return responceData('OTP Send Success', HttpStatus.OK);
      } else {
        return new BadRequestException('OTP send fail');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async verification(userCredential: VerificationDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userCredential.email },
        select: ['id', 'email', 'password', 'otp'],
      });

      if (!user) {
        return new NotFoundException('User Not Found');
      }

      if (user.otp !== userCredential.otp) {
        return new BadRequestException('Invalid OTP');
      }

      const newHashedPassword = await hashedPassword(userCredential.password);
      const updateRes = await this.userRepository.update(user.id, {
        otp: null,
        password: newHashedPassword,
      });

      if (updateRes.affected) {
        return responceData('OTP Send Success', HttpStatus.OK);
      } else {
        return new BadRequestException('OTP send fail');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
