import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';  // Import the User entity
import { Review } from './review.entity';

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

    @OneToMany(() => Routine, routine => routine.reviews)
    @JoinColumn({ name: 'routine_key' })
    reviews!: Review[];
}
