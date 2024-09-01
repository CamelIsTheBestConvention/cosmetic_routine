// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

// module.exports = {
//     type: 'mysql',
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     synchronize: true,
//     logging: true,
//     entities: [
//         'src/entities/*.entity.ts'
//     ],
//     migrations: [
//         'src/migration/**/*.ts'
//     ],
//     subscribers: [
//         'src/subscriber/**/*.ts'
//     ],
//     cli: {
//         entitiesDir: 'src/entities',
//         migrationsDir: 'src/migration',
//         subscribersDir: 'src/subscriber'
//     }
// };