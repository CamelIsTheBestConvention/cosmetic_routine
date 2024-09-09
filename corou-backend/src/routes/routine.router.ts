import { Router } from 'express';
import { container } from 'tsyringe';
import { RoutineController } from '../controllers/routine.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupUserRouter(): Router {
    const router = Router();
    const routineController = container.resolve(RoutineController);

    router.get('/:routine_key', (req, res) => routineController.getRoutineByKey(req, res));
    router.get('/', (req, res) => routineController.getRoutines(req, res));
    router.post('/', authMiddleware, (req, res) => routineController.createRoutine(req, res));
    router.put('/:routine_key', authMiddleware, (req, res) => routineController.updateRoutine(req, res));
    router.delete('/:routine_key', authMiddleware, (req, res) => routineController.deleteRoutine(req, res));

    return router;
}