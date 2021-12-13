import { EmailDTO } from './dto/sendEmail.dto';
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UitlsService } from './utils.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Utils')
@ApiBearerAuth()
@Controller('utils')
export class UtilsController {
  constructor(private readonly uitlsService: UitlsService) {}

  @Post('send-email')
  @HttpCode(HttpStatus.OK)
  sendEmail(@Body() body: EmailDTO) {
    try {
      return this.uitlsService.sendEmail(body);
    } catch (error) {
      return error;
    }
  }
}
