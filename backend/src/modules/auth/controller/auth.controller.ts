import { ChangePasswordDTO } from './../dto/changePassword.dto';
import { LoginDTO } from './../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ResponceData } from 'src/model/responce-data.model';
import { SignUpDTO } from '../dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(ValidationPipe) userCredential: SignUpDTO,
  ): Promise<ResponceData> {
    return this.authService.signup(userCredential);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body(ValidationPipe) userCredential: LoginDTO,
  ): Promise<ResponceData> {
    return this.authService.signin(userCredential);
  }

  @Put('changePassword')
  changePassword(@Body(ValidationPipe) body: Partial<ChangePasswordDTO>) {
    try {
      return this.authService.changePassword(body);
    } catch (error) {
      return error;
    }
  }
}
