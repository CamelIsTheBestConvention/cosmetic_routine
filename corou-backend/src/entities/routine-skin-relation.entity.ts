import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Routine } from './routine.entity';
import { SkinAttribute } from './skin-attribute.entity';

@Entity('routine_skin_relation')
export class RoutineSkinRelation {
    @PrimaryColumn()
    routine_key!: number;

    @PrimaryColumn()
    attr_key!: number;

    @ManyToOne(() => Routine, routine => routine.routine_skin_relations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'routine_key' })
    routine!: Routine;

    @ManyToOne(() => SkinAttribute)
    @JoinColumn({ name: 'attr_key' })
    attribute!: SkinAttribute;
}