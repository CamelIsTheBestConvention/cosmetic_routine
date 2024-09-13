import { Router } from 'express';
import { container } from 'tsyringe';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupReviewRouter(): Router {
    const router = Router();
    const reviewController = container.resolve(ReviewController);

    router.delete('/:review_key', authMiddleware, (req, res) => reviewController.deleteReview(req, res));

    return router;
}