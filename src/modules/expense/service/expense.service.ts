import { ExpenseEntity } from '../entity/expense.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../model/expense.model';
import { from, Observable } from 'rxjs';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseEntity) private readonly expenseRepository: Repository<ExpenseEntity>
    ) { }

    getAll(): Observable<Expense[]> {
        return from(this.expenseRepository.find({}));
    }

    getById(id: number): Observable<Expense> {
        return from(this.expenseRepository.findOne(id))
    }

    create(expense: Expense): Observable<Expense> {
        console.log(expense)
        return from(this.expenseRepository.save(expense));
    }

    update(id: number, expense: Expense): Observable<any> {
        return from(this.expenseRepository.update(id, expense));
    }

    delete(id: number): Observable<any> {
        return from(this.expenseRepository.delete(id));
    }

}
