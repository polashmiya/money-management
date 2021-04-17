import { CreateUserDto, LoginDto } from './../../user/dto/user.dto';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ResponceData } from 'src/model/responce-data.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(ValidationPipe) userCredential: CreateUserDto,
  ): Promise<ResponceData> {
    return this.authService.signup(userCredential);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(
    @Body(ValidationPipe) userCredential: LoginDto,
  ): Promise<ResponceData> {
    return this.authService.signin(userCredential);
  }
}
