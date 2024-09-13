import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';  // Import the User entity
import { Review } from './review.entity';
import { RoutineDetail } from './routine-detail.entity';

@Entity('routine')
export class Routine {
    @PrimaryGeneratedColumn()
    routine_key!: number;

    @Column({ type: 'varchar', length: 255 })
    routine_name!: string;

    @Column({ type: 'int' })
    steps!: number;

    @Column({ type: 'char', length: 1 })
    for_gender!: 'M' | 'F' | 'A';

    @Column({ type: 'int' })
    for_age!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_key' })
    user!: User;
}
