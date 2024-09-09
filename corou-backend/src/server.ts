import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './config/ormconfig';
import { setupRoutes } from './routes/routes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

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
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();