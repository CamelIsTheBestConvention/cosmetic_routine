import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { container } from 'tsyringe';
import { REPOSITORY_TOKENS } from './constants';

import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Routine } from '../entities/routine.entity';
import { Item } from '../entities/item.entity';
import { SkinAttribute } from '../entities/skin-attribute.entity';
import { UserSkinRelation } from '../entities/user-skin-relation.entity';
import { ItemOrder } from '../entities/item-order.entity';
import { OrderDetail } from '../entities/order-detail.entity';
import { Review } from '../entities/review.entity';

dotenv.config({ path: '.env' }); // 상대적 위치가 아닌, 루트 위치에서 .env 파일을 찾아서 환경변수를 설정


const { DB_DATABASE, DB_USER, DB_HOST, DB_PASSWORD } = process.env;

if (!DB_DATABASE || !DB_USER || !DB_HOST || !DB_PASSWORD) {
    throw new Error('Missing database configuration environment variables.');
}

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Address, Routine, Item, SkinAttribute, UserSkinRelation, ItemOrder, OrderDetail, Review],
    // entities: [
    // 'src/entities/*.ts'
    // ]
});


export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established successfully');

        container.registerInstance(DataSource, AppDataSource);

        const repositories = [
            { name: REPOSITORY_TOKENS.UserRepository, entity: User },
            { name: REPOSITORY_TOKENS.AddressRepository, entity: Address },
            { name: REPOSITORY_TOKENS.RoutineRepository, entity: Routine },
            { name: REPOSITORY_TOKENS.ItemRepository, entity: Item },
            { name: REPOSITORY_TOKENS.SkinAttributeRepository, entity: SkinAttribute },
            { name: REPOSITORY_TOKENS.UserSkinRelationRepository, entity: UserSkinRelation },
            { name: REPOSITORY_TOKENS.ItemOrderRepository, entity: ItemOrder },
            { name: REPOSITORY_TOKENS.OrderDetailRepository, entity: OrderDetail },
            { name: REPOSITORY_TOKENS.ReviewRepository, entity: Review },
        ];

        for (const repo of repositories) {
            container.register(repo.name, { useValue: AppDataSource.getRepository(repo.entity) });
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

