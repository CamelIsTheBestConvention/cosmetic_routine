import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('tag')
export class Tag {
    @PrimaryGeneratedColumn()
    tag_key!: number;

    @Column({ type: 'varchar', length: 255 })
    tag_name!: string;
}
