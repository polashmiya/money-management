import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpenseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    amount: number;

    @Column({ default: "expense" })
    type: string;

    @CreateDateColumn({ type: 'date' })
    date: Date
}