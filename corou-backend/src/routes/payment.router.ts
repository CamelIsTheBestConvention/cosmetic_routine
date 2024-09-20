import { Router } from 'express';
import { createPayment, getPayment } from '../controllers/payment.controller';

const router = Router();

router.post('/payments', createPayment);
router.get('/payments/:impUid', getPayment);

export default router;