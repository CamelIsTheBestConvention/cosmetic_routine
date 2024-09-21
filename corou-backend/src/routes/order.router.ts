import { Router } from 'express';
import { container } from 'tsyringe';
import { OrderController } from '../controllers/order.controller';
import { CartController } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export function setupOrderRouter(): Router {
    const router = Router();
    const orderController = container.resolve(OrderController);
    const cartController = container.resolve(CartController);

    router.get('/cart', authMiddleware, (req, res) => cartController.getCart(req, res));
    router.get('/itemorder/:order_key', authMiddleware, (req, res) => orderController.getOrderByKey(req, res));
    router.get('/itemorder', authMiddleware, (req, res) => orderController.getOrder(req, res));
    router.post('/cart', authMiddleware, (req, res) => cartController.addToCart(req, res));
    router.post('/itemorder', authMiddleware, (req, res) => orderController.createOrder(req, res));
    router.put('/cart', authMiddleware, (req, res) => cartController.updateCart(req, res));
    router.delete('/cart', authMiddleware, (req, res) => cartController.deleteCart(req, res));


    return router;
}