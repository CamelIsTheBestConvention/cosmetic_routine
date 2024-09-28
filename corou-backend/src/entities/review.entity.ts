import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Routine } from './routine.entity';
import { Item } from './item.entity';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn()
    review_key!: number;

    @Column()
    user_key!: number;

    @Column({ nullable: true })
    routine_key?: number;

    @Column({ nullable: true })
    item_key?: number;

    @Column({ type: 'varchar', length: 1 })
    review_type!: 'R' | 'I';

    @Column({ type: 'varchar', length: 255 })
    review_content!: string;

    @Column({ type: 'date' })
    review_at!: Date;

    @Column({ type: 'int' })
    rating!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_key' })
    user!: User;

    @ManyToOne(() => Routine, routine => routine.routine_tag_relations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'routine_key' })
    routine?: Routine;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'item_key' })
    item?: Item;
}