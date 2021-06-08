import { Module } from '@nestjs/common';
import { UitlsService } from './utils.service';
import { UtilsController } from './utils.controller';

@Module({
  controllers: [UtilsController],
  providers: [UitlsService],
})
export class UtilsModule {}
