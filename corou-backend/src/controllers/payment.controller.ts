import { Request, Response } from 'express';
import { PortoneService } from '../services/portone.service';
import { container } from 'tsyringe';

const portoneService = container.resolve(PortoneService);

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const paymentData = req.body.paymentData;
        const payment = await portoneService.createPayment(paymentData);
        res.status(201).json(payment);
    } catch (error) {
        console.error('Error in createPayment controller:', error);
        res.status(500).json({ message: '결제 생성에 실패했습니다.' });
    }
};

export const getPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { paymentId } = req.params;
        const payment = await portoneService.getPayment(paymentId);
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error in getPayment controller:', error);
        res.status(500).json({ message: '결제 조회에 실패했습니다.' });
    }
};