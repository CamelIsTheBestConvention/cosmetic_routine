import { Express } from 'express';
import { setupUserRouter } from './user.router';
// import routineRouter from './routine.router';

export function setupRoutes(app: Express) {
    app.use('/api/user', setupUserRouter());
    
    // app.use('/api/routine', setupRoutineRouter());
}