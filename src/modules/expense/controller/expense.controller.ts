import { Body, Controller, Param, Post, Get, Put, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense.model';
import { ExpenseService } from '../service/expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(
        private expenseService: ExpenseService
    ) { }

    @Get()
    getAll(): Observable<Expense[]> {
        return this.expenseService.getAll();
    }

    @Get(":id")
    getById(@Param('id') id: number): Observable<Expense> {
        return this.expenseService.getById(id);
    }

    @Post()
    create(@Body() expense: Expense): Observable<Expense> {
        console.log(expense)
        return this.expenseService.create(expense);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() expense: Expense): Observable<any> {
        return this.expenseService.update(id, expense);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<any> {
        return this.expenseService.delete(id);
    }
}
