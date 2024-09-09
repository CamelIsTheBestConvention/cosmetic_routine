import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { ItemOrder } from './item-order.entity';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    address_key!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255 })
    addr!: string;

    @Column({ type: 'varchar', length: 255 })
    addr_detail!: string;

    @Column({ type: 'varchar', length: 255 })
    zip!: string;

    @Column({ type: 'varchar', length: 255 })
    tel!: string;

    @Column({ type: 'varchar', length: 255 })
    request!: string;

    @Column({ type: 'varchar', length: 1 })
    is_default!: 'Y' | 'N';

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_key' })
    user!: User;
}