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
import { ExpenseService } from '../service/expense.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get()
  getAll() {
    try {
      return this.expenseService.getAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    try {
      return this.expenseService.getById(id);
    } catch (error) {
      return error;
    }
  }

  @Post()
  create(@Body(ValidationPipe) expense: ExpenseDto) {
    try {
      return this.expenseService.create(expense);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @ApiBody({ type: ExpenseDto })
  update(@Param('id') id: string, @Body() expense: Partial<ExpenseDto>) {
    try {
      return this.expenseService.update(id, expense);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.expenseService.delete(id);
    } catch (error) {
      return error;
    }
  }
}
