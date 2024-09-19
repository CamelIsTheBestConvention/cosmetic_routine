import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { container } from 'tsyringe';
import { REPOSITORY_TOKENS } from './constants';

import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Routine } from '../entities/routine.entity';
import { RoutineDetail } from '../entities/routine-detail.entity';
import { Item } from '../entities/item.entity';
import { SkinAttribute } from '../entities/skin-attribute.entity';
import { UserSkinRelation } from '../entities/user-skin-relation.entity';
import { RoutineSkinRelation } from '../entities/routine-skin-relation.entity';
import { RoutineTagRelation } from '../entities/routine-tag-relation.entity';
import { ItemOrder } from '../entities/item-order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import { Review } from '../entities/review.entity';
import { Tag } from '../entities/tag.entity';

dotenv.config({ path: '.env' }); // 상대적 위치가 아닌, 루트 위치에서 .env 파일을 찾아서 환경변수를 설정


const { DB_DATABASE, DB_USER, DB_HOST, DB_PASSWORD } = process.env;


if (!DB_DATABASE || !DB_USER || !DB_HOST || !DB_PASSWORD) {
    throw new Error('Missing database configuration environment variables.');
}

const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Address, Routine, RoutineDetail, Item, SkinAttribute, UserSkinRelation, RoutineSkinRelation, RoutineTagRelation, ItemOrder, OrderDetail, Review, Tag],

});

export default AppDataSource;
