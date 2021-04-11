import { ExpenseDto } from './../dto/expence.dto';
import { ResponceData } from './../../../model/responce-data.model';
import { responceData } from './../../../utils/responce-data.util';
import { ExpenseEntity } from '../entity/expense.entity';
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
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async getAll(): Promise<ResponceData> {
    try {
      const [expence, count] = await this.expenseRepository.findAndCount();
      const data = { expence, total: count };

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getById(id: string): Promise<ResponceData> {
    try {
      const data = await this.expenseRepository.findOne({ where: { id } });

      if (!data) {
        throw new NotFoundException();
      }

      return responceData('Get Data Success', HttpStatus.OK, data);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Expense or Income Not Found');
      }
      throw new InternalServerErrorException();
    }
  }

  async create(expense: ExpenseDto): Promise<ResponceData> {
    try {
      const createExpense = this.expenseRepository.create(expense);
      const expenseRes = await createExpense.save();

      return responceData('Create Success', HttpStatus.OK, expenseRes);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    expense: Partial<ExpenseDto>,
  ): Promise<ResponceData> {
    try {
      const res = await this.expenseRepository.update(id, expense);

      if (res.affected) {
        const expenseRes = await this.expenseRepository.findOne({
          where: { id },
        });
        return responceData('Update Success', HttpStatus.OK, expenseRes);
      }
      throw new BadRequestException();
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException('No Expense or Income found');
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<ResponceData> {
    try {
      const delRes = await this.expenseRepository.delete(id);
      if (delRes.affected) {
        return responceData('Delete Success', HttpStatus.OK);
      }
      throw new BadRequestException();
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException('No Expense or Income Found');
      }
      throw new InternalServerErrorException();
    }
  }
}
