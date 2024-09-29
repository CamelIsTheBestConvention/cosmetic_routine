import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { container } from 'tsyringe';

export function setupPaymentRouter(): Router {
    const router = Router();

    const paymentController = container.resolve(PaymentController);

    router.get('/:imp_uid', (req, res) => paymentController.getPayment(req, res));

    return router;
}