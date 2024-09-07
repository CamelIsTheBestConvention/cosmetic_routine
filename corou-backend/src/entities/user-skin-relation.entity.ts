import 'reflect-metadata';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { SkinAttribute } from './skin-attribute.entity';

@Entity('user_skin_relation')
export class UserSkinRelation {
    @PrimaryColumn()
    user_key!: number;

    @PrimaryColumn()
    attr_key!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_key' })
    user!: User;

    @ManyToOne(() => SkinAttribute)
    @JoinColumn({ name: 'attr_key' })
    attribute!: SkinAttribute;
}