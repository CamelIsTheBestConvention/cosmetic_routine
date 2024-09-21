import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { Cart } from '../entities/cart.entity';

@injectable()
export class CartService {
    constructor(
        @inject(REPOSITORY_TOKENS.CartRepository) private cartRepository: Repository<Cart>
    ) { }

    async addToCart(user_key: number, item_key: number, quantity: number): Promise<Cart> {
        const cart = this.cartRepository.create({ user_key, item_key, quantity });
        return this.cartRepository.save(cart);
    }

    async getCart(user_key: number): Promise<Cart[]> {
        return this.cartRepository.find({ 
            where: { user_key },
            relations: ['item'] 
        });
    }

    async deleteCart(cart_key: number): Promise<void> {
        await this.cartRepository.delete(cart_key);
    }

    async updateCart(cart_key: number, quantity: number): Promise<void> {
        await this.cartRepository.update(cart_key, { quantity });
    }
}