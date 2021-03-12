import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column({ default: 'expense' })
  type: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
