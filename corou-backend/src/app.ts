import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';

// initializeDatabase();

const app = express();

//trust proxy
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

//request body parser
app.use(bodyParser.json());


export default app;

