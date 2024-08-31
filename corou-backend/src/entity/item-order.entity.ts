import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';
// import { OrderDetail } from './order-detail.entity';

@Entity('item_order')
export class ItemOrder {
    @PrimaryGeneratedColumn()
    item_order_key!: number;

    @Column()
    user_key!: number;

    @Column()
    address_key!: number;

    @Column({ type: 'date' })
    order_at!: Date;

    @Column({ type: 'varchar', length: 255 })
    status!: 'ORDERED' | 'CANCELLED' | 'DELIVERED';

    @Column({ type: 'int' })
    price_total!: number;

    @ManyToOne(() => User, user => user.itemOrders)
    @JoinColumn({ name: 'user_key' })
    user!: User;

    @OneToOne(() => Address, address => address.itemOrder)
    @JoinColumn({ name: 'address_key' })
    address!: Address;
}