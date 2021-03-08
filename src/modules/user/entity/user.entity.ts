import { BeforeInsert, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({ type: 'date' })
    dob: Date

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number

    @BeforeInsert()
    emailLowerCase() {
        this.email = this.email.toLowerCase();
    }

}