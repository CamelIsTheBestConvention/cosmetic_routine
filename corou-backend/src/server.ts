import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/ormconfig';
import { setupRoutes } from './routes/routes';
import paymentRoutes from './routes/payment.router';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Replace with your allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.use(morgan('combined'));

app.use('/api', paymentRoutes);
// app.use((req, res, next) => {
//     console.log('body:', req.body);
//     next();
// });

async function startServer() {
    try {
        await initializeDatabase();
        console.log('Database initialized successfully');

        setupRoutes(app);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Database connected to:', process.env.DB_HOST);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();
