import { ExpenseDto } from './../dto/expence.dto';
import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ResponceData } from 'src/model/responce-data.model';
import { ExpenseService } from '../service/expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  getAll(): Promise<ResponceData> {
    return this.expenseService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ResponceData> {
    return this.expenseService.getById(id);
  }

  @Post()
  create(@Body(ValidationPipe) expense: ExpenseDto): Promise<ResponceData> {
    return this.expenseService.create(expense);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() expense: Partial<ExpenseDto>,
  ): Promise<ResponceData> {
    return this.expenseService.update(id, expense);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ResponceData> {
    return this.expenseService.delete(id);
  }
}
