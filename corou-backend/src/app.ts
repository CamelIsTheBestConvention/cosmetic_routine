import 'reflect-metadata';
import express from 'express';
// import { AppDataSource, initializeDatabase } from './config/ormconfig';
// import { container } from 'tsyringe';
// import { UserController } from './controllers/user.controller';
// import userRouter from './routes/user.router';
import bodyParser from 'body-parser';

// initializeDatabase();

const app = express();
app.use(bodyParser.json());

export default app;

