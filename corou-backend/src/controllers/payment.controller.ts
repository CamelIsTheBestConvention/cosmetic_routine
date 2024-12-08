import { Request, Response } from 'express';
import { PortoneService } from '../services/portone.service';
import { container } from 'tsyringe';
import { verifyToken } from '../utils/jwt.utils';
import { inject, injectable } from 'tsyringe';


@injectable()
export class PaymentController {
    constructor(
        private portoneService: PortoneService
    ) { }

    async getPayment(req: Request, res: Response): Promise<void> {
        try {
            const { imp_uid } = req.params;
            const payment = await this.portoneService.getPayment(imp_uid);
            res.status(200).json(payment);
        } catch (error) {
            console.error('Error in getPayment controller:', error);
            res.status(500).json({ message: '결제 조회에 실패했습니다.' });
        }
    }
}

