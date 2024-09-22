import { Router } from 'express';
import { getPayment } from '../controllers/payment.controller';

const router = Router();

router.get('/payments/:imp_uid', getPayment);

export default router;