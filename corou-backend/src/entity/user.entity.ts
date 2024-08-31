import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Routine } from './routine.entity';
import { Address } from './address.entity';
import { ItemOrder } from './item-order.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    user_key!: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'varchar', length: 255 })
    username!: string;

    @Column({ type: 'date' })
    birth_date!: Date;

    @Column({ type: 'char', length: 1 })
    gender!: 'M' | 'F';

    @OneToMany(() => Routine, routine => routine.user)
    @JoinColumn({ name: 'user_key' })
    routines!: Routine[];

    @OneToMany(() => Address, address => address.user)
    @JoinColumn({ name: 'user_key' })
    addresses!: Address[];

    @OneToMany(() => ItemOrder, itemOrder => itemOrder.user)
    @JoinColumn({ name: 'user_key' })
    itemOrders!: ItemOrder[];
}