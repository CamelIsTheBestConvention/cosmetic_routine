import { Express } from 'express';
import { setupUserRouter } from './user.router';
// import routineRouter from './routine.router';
// Import other routers as needed

export function setupRoutes(app: Express) {
    app.use('/api/user', setupUserRouter());

    // app.use('/api/routine', routineRouter);
    // Add other routers here
}