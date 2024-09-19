import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import createRateLimiter from './middlewares/rate-limit.middleware';

// initializeDatabase();

const app = express();

//trust proxy
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

//request body parser
app.use(bodyParser.json());


//rate limiting 
const rateLimiter = createRateLimiter();
app.use(rateLimiter);

export default app;

