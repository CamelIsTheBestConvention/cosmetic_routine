import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('skin_attribute')
export class SkinAttribute {
    @PrimaryGeneratedColumn()
    attr_key!: number;

    @Column({ type: 'varchar', length: 255 })
    attr_name!: string;
}