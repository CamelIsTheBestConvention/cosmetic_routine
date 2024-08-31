import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';  // Import the User entity

@Entity('routine')
export class Routine {
    @PrimaryGeneratedColumn()
    routine_key!: number;

    @Column()
    user_key!: number;

    @Column({ type: 'varchar', length: 255 })
    routine_name!: string;

    @Column({ type: 'int' })
    steps!: number;

    @ManyToOne(() => User, user => user.routines)
    @JoinColumn({ name: 'user_key' })
    user!: User;
}
