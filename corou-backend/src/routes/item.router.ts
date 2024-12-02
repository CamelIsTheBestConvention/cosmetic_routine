import { Router } from 'express';
import { container } from 'tsyringe';
import { ItemController } from '../controllers/item.controller';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupItemRouter(): Router {
    const router = Router();
    const itemController = container.resolve(ItemController);
    const reviewController = container.resolve(ReviewController);

    router.get('/key/:item_key', (req, res) => itemController.getItemByKey(req, res));
    router.get('/name/:item_name', (req, res) => itemController.getItemByName(req, res));
    router.get('/search/:query', (req, res) => itemController.searchItem(req, res));
    router.get('/:item_key/review', (req, res) => reviewController.getReviewByItem(req, res));
    router.get('/', (req, res) => itemController.getAllItems(req, res));
    router.post('/:item_key/review', authMiddleware, (req, res) => reviewController.createItemReview(req, res));
    router.post('/', (req, res) => itemController.createItem(req, res));
    router.put('/:item_key', authMiddleware, (req, res) => itemController.updateItem(req, res));

    return router;
}