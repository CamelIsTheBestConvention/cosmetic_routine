import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    item_key!: number;

    @Column({ type: 'varchar', length: 255 })
    item_name!: string;

    @Column({ type: 'int' })
    item_price!: number;

    @Column({ type: 'varchar', length: 255 })
    description!: string;

    @Column({ type: 'varchar', length: 255 })
    category!: string;

    @OneToMany(() => Review, review => review.item)
    @JoinColumn({ name: 'item_key' })
    reviews!: Review[];
}
