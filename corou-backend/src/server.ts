// import app from './app';
// import userRouter from './routes/user.router';
// import { initializeDatabase } from './config/ormconfig';

// const PORT = process.env.PORT || 3000;

// initializeDatabase().then(() => {
//     app.use('/api/user', userRouter);

//     app.get('/', (req, res) => {
//         res.send('Hello World');
//     });

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((error) => {
//     console.error('Error starting the server:', error);
// });

import 'reflect-metadata';
import express from 'express';
import { initializeDatabase } from './config/ormconfig';
import { setupRoutes } from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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