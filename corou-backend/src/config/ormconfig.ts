import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/user.entity';
import { Address } from '../entities/address.entity';
import { Routine } from '../entities/routine.entity';
import { Item } from '../entities/item.entity';

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
    // entities: [User, Address, Routine, Item],
    entities: [
        'src/entities/*.entity.ts'
    ],
});


AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established successfully');
        // DB연결 성공시 문구 출력
    })
    .catch(e => {
        console.log('Database connection failed');
        console.error(e);
    });

