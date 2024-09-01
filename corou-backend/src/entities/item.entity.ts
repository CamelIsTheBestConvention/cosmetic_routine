import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    item_key!: number;

    @Column({ type: 'varchar', length: 255 })
    item_name!: string;

    @Column({ type: 'int' })
    item_price!: number;

    @Column({ type: 'varchar', length: 255 })
    category!: string;
}
