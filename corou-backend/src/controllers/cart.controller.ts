import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { CartService } from '../services/cart.service';
import { verifyToken } from '../utils/jwt.utils';

@injectable()
export class CartController {
    constructor(
        private cartService: CartService,
    ) { }

    async getCart(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;

        try {
            const cart = await this.cartService.getCart(user_key);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: '장바구니 조회에 실패했습니다.' });
        }
    }

    async addToCart(req: Request, res: Response): Promise<void> {
        console.log(req)
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
            return;
        }
        const decoded = verifyToken(token);
        const user_key = decoded.user_key;
        const { item_key, quantity } = req.body;
        try {
            const cart = await this.cartService.addToCart(user_key, item_key, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: '장바구니 추가에 실패했습니다.' });
        }
    }

    async updateCart(req: Request, res: Response): Promise<void> {
        const { cart_key, quantity } = req.body;
        try {
            const cart = await this.cartService.updateCart(cart_key, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: '장바구니 업데이트에 실패했습니다.' });
        }
    }
    async deleteCart(req: Request, res: Response): Promise<void> {
        const { cart_key } = req.body;
        try {
            await this.cartService.deleteCart(cart_key);
            res.status(200).json({ message: '장바구니 삭제 완료' });
        } catch (error) {
            res.status(500).json({ message: '장바구니 삭제에 실패했습니다.' });
        }
    }
}