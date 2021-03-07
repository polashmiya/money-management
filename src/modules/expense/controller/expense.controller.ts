import { Body, Controller, Param, Post, Get, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponceData } from 'src/model/responce-data.model';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../service/expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(
        private expenseService: ExpenseService
    ) { }

    @Get()
    getAll(): Observable<ResponceData> {
        return this.expenseService.getAll();
    }

    @Get(":id")
    getById(@Param('id') id: number): Observable<ResponceData> {
        return this.expenseService.getById(id);
    }

    @Post()
    create(@Body() expense: Expense): Observable<ResponceData> {
        return this.expenseService.create(expense);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() expense: Expense): Observable<ResponceData> {
        return this.expenseService.update(id, expense);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<ResponceData> {
        return this.expenseService.delete(id);
    }
}
