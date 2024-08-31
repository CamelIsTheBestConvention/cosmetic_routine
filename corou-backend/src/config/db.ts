import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entity/user.entity';
import { Routine } from '../entity/routine.entity';
import { Item } from '../entity/item.entity';

dotenv.config({ path: '../../.env' });

const { DB_DATABASE, DB_USER, DB_HOST, DB_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false, 
    logging: false,
    entities: [User, Routine, Item], 
    migrations: [],
    subscribers: []
});


AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established successfully');
        // DB연결 성공시 문구 출력
    })
    .catch(e => {
        console.error(e);
    });

