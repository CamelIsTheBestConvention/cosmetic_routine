import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';
import { OrderDetail } from './order-detail.entity';
import { Cart } from './cart.entity';

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn()
    item_key!: number;

    @Column({ type: 'varchar', length: 255 })
    item_name!: string;

    @Column({ type: 'varchar', length: 255 })
    brand_name!: string;

    @Column({ type: 'int' })
    volume!: number;

    @Column({ type: 'int' })
    item_price!: number;

    @Column({ type: 'float', default: 0 })
    average_rating!: number;

    @Column({ type: 'varchar', length: 255 })
    description!: string;

    @Column({ type: 'varchar', length: 255 })
    category!: string;

    @OneToMany(() => Cart, cart => cart.item, { cascade: true })
    carts?: Cart[]

    @OneToMany(() => Review, review => review.item, { cascade: true })
    reviews?: Review[]

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.item)
    orderDetails?: OrderDetail[]
}
