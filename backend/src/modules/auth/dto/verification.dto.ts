import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDTO } from './login.dto';

export class VerificationDTO extends LoginDTO {
  @ApiProperty({ example: 2343454 })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
