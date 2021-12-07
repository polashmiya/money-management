import { ExpenseDto } from './../dto/expence.dto';
import { responceData } from './../../../utils/responce-data.util';
import { Expense } from '../entity/expense.entity';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async getAll() {
    try {
      const [expence, count] = await this.expenseRepository.findAndCount();
      const data = { expence, total: count };

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string) {
    try {
      const data = await this.expenseRepository.findOne({ where: { id } });

      if (!data) {
        return new NotFoundException('Expense or Income Not Found');
      }

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(expense: ExpenseDto) {
    try {
      const createExpense = this.expenseRepository.create(expense);
      const expenseRes = await createExpense.save();

      return responceData('Create Success', HttpStatus.OK, expenseRes);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, expense: Partial<ExpenseDto>) {
    try {
      const res = await this.expenseRepository.update(id, expense);

      if (res.affected) {
        const expenseRes = await this.expenseRepository.findOne({
          where: { id },
        });
        return responceData('Update Success', HttpStatus.OK, expenseRes);
      }
      return new BadRequestException('No Expense or Income found');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const delRes = await this.expenseRepository.delete(id);
      if (delRes.affected) {
        return responceData('Delete Success', HttpStatus.OK);
      }
      return new BadRequestException('No Expense or Income Found');
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
      }
      throw new InternalServerErrorException();
    }
  }
}
