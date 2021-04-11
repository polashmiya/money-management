import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  amount: number;

  @IsString()
  type?: string;

  @IsDateString()
  @IsNotEmpty()
  expenseDate?: Date;
}
