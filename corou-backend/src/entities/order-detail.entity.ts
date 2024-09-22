import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import 'reflect-metadata';
import { Item } from './item.entity';
import { ItemOrder } from './item-order.entity';


@Entity('order_detail')
export class OrderDetail {

    @PrimaryColumn()
    item_key!: number;

    @PrimaryColumn()
    order_key!: number;

    @Column()
    count!: number;

    @Column()
    purchase_price!: number;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'item_key' })
    item!: Item;

    @ManyToOne(() => ItemOrder)
    @JoinColumn({ name: 'order_key' })
    item_order!: ItemOrder;
}