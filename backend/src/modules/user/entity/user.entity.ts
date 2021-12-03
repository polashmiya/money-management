import { ExpenseEntity } from './../../expense/entity/expense.entity';
import { compare, hash } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expense: ExpenseEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
