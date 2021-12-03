import { EmailDTO } from './dto/sendEmail.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UitlsService } from './utils.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Utils')
@Controller('utils')
export class UtilsController {
  constructor(private readonly uitlsService: UitlsService) {}

  @Post('sendEmail')
  @HttpCode(HttpStatus.OK)
  sendEmail(@Body() body: EmailDTO) {
    try {
      return this.uitlsService.sendEmail(body);
    } catch (error) {
      return error;
    }
  }
}
