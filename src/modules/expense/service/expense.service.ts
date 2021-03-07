import { ResponceData } from './../../../model/responce-data.model';
import { responceData } from './../../../utils/responce-data.util';
import { map, mergeMap } from 'rxjs/operators';
import { ExpenseEntity } from '../entity/expense.entity';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../model/expense.model';
import { from, Observable } from 'rxjs';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseEntity) private readonly expenseRepository: Repository<ExpenseEntity>
    ) { }

    getAll(): Observable<ResponceData> {
        return from(this.expenseRepository.find({})).pipe(
            map((data) => {
                return responceData(
                    "Get Data Success",
                    HttpStatus.OK,
                    data
                )
            })
        );
    }

    getById(id: number): Observable<ResponceData> {
        return from(this.expenseRepository.findOne(id)).pipe(
            map((data) => {
                if (data) {
                    return responceData(
                        "Get Data Success",
                        HttpStatus.OK,
                        data
                    );
                } else {
                    throw new NotFoundException();
                }
            })
        );
    }

    create(expense: Expense): Observable<ResponceData> {
        return from(this.expenseRepository.save(expense)).pipe(
            map((data) => {
                return responceData(
                    "Create Success",
                    HttpStatus.CREATED,
                    data
                );
            })
        );
    }

    update(id: string, expense: Expense): Observable<ResponceData> {
        return from(this.expenseRepository.update(id, expense)).pipe(
            mergeMap((resData) => {
                if (resData.affected === 1) {
                    return from(this.expenseRepository.findOne({ id })).pipe(
                        map((data) => {
                            return responceData(
                                "Update Success",
                                HttpStatus.OK,
                                data
                            );
                        })
                    )
                } else {
                    throw new NotFoundException();
                }

            })
        );
    }

    delete(id: number) {
        return from(this.expenseRepository.delete(id)).pipe(
            map((data) => {
                if (data.affected === 1) {
                    return responceData(
                        "Delete Success",
                        HttpStatus.OK
                    );
                } else {
                    throw new NotFoundException();
                }
            })
        );
    }

}
