import { Router } from 'express';
import { container } from 'tsyringe';
import { RoutineController } from '../controllers/routine.controller';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupRoutineRouter(): Router {
    const router = Router();
    const routineController = container.resolve(RoutineController);
    const reviewController = container.resolve(ReviewController);

    router.get('/:routine_key/review', (req, res) => reviewController.getReviewByRoutine(req, res));
    router.get('/:routine_key', (req, res) => routineController.getRoutineByKey(req, res));
    router.get('/', (req, res) => routineController.getRoutines(req, res));
    router.post('/:routine_key/review', (req, res) => reviewController.createRoutineReview(req, res));
    router.post('/', authMiddleware, (req, res) => routineController.createRoutine(req, res));
    router.put('/:routine_key/detail/:step_number', authMiddleware, (req, res) => routineController.updateRoutineDetail(req, res));
    router.put('/:routine_key', authMiddleware, (req, res) => routineController.updateRoutine(req, res));
    router.delete('/:routine_key/detail/:step_number', authMiddleware, (req, res) => routineController.deleteRoutineDetail(req, res));
    router.delete('/:routine_key', authMiddleware, (req, res) => routineController.deleteRoutine(req, res));

    return router;
}