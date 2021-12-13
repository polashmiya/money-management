import { LoginDTO } from './../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpDTO } from '../dto/signup.dto';
import { Public } from '../decorator/public.decorator';
import { ForgetPasswordDTO } from '../dto/forgetPassword.dto';
import { VerificationDTO } from '../dto/verification.dto';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) userCredential: SignUpDTO) {
    try {
      return this.authService.signup(userCredential);
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body(ValidationPipe) userCredential: LoginDTO) {
    try {
      return this.authService.signin(userCredential);
    } catch (error) {
      return error;
    }
  }

  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  forgetPassword(@Body(ValidationPipe) userCredential: ForgetPasswordDTO) {
    try {
      return this.authService.forgetPassword(userCredential);
    } catch (error) {
      return error;
    }
  }

  @Post('verification')
  @HttpCode(HttpStatus.OK)
  verification(@Body(ValidationPipe) userCredential: VerificationDTO) {
    try {
      return this.authService.verification(userCredential);
    } catch (error) {
      return error;
    }
  }
}
