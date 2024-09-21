import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { CartService } from '../services/cart.service';
import { ItemOrderService } from '../services/item-order.service';
import { AddressService } from '../services/address.service';
import { OrderDetailService } from '../services/order-detail.service';
import { verifyToken } from '../utils/jwt.utils';

@injectable()
export class OrderController {
    constructor(
        private itemOrderService: ItemOrderService,
        private addressService: AddressService,
        private orderDetailService: OrderDetailService
    ) { }

    async getOrderByKey(req: Request, res: Response): Promise<void> {
        const { order_key } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        try {
            const order = await this.itemOrderService.getItemOrderByKey(Number(order_key), user_key);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: '주문 조회에 실패했습니다.' });
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        try {
            const orders = await this.itemOrderService.getItemOrderByUser(user_key);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: '주문 조회에 실패했습니다.' });
        }
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const { addr_key, price_total } = req.body;
        const items = req.body.items;
        try {
            const order = await this.itemOrderService.createItemOrder(user_key, addr_key, price_total, items);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: '주문 생성에 실패했습니다.' });
        }
    }
}
