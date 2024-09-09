import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { ItemOrder } from '../entities/item-order.entity';
import { UserService } from './user.service';
import { AddressService } from './address.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ItemOrderService {
    constructor(
        @inject('ItemOrderRepository') private itemOrderRepository: Repository<ItemOrder>,
        @inject('UserService') private userService: UserService,
        @inject('AddressService') private addressService: AddressService
    ) { }

    // 주문 생성
    async createItemOrder(user_key: number, addr_key: number, price_total: number): Promise<ItemOrder> {
        const user = await this.userService.getUserByKey(user_key);
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        const address = await this.addressService.getAddress(addr_key);
        if (!address) {
            throw new Error('해당 주소를 찾을 수 없습니다.');
        }
        const newItemOrder = this.itemOrderRepository.create({
            user,
            address,
            order_at: new Date(),
            status: 'ORDERED',
            price_total
        });
        return await this.itemOrderRepository.save(newItemOrder);
    }

    // 사용자 주문 조회 
    async getItemOrderByUser(user_key: number): Promise<ItemOrder[]> {
        const itemOrders = await this.itemOrderRepository.find({ where: { user: { user_key } } });
        if (!itemOrders.length) {
            throw new Error('주문을 찾을 수 없습니다.');
        }
        return itemOrders;
    }

    // 주문 조회 by key
    async getItemOrderByKey(order_key: number): Promise<ItemOrder> {
        const itemOrder = await this.itemOrderRepository.findOne({ where: { order_key } });
        if (!itemOrder) {
            throw new Error('주문을 찾을 수 없습니다.');
        }
        return itemOrder;
    }

    // 주문 상태 변경
    async changeOrderStatus(order_key: number, status: 'ORDERED' | 'CANCELLED' | 'DELIVERED'): Promise<ItemOrder> {
        const itemOrder = await this.itemOrderRepository.findOne({ where: { order_key } });
        if (!itemOrder) {
            throw new Error('주문을 찾을 수 없습니다.');
        }
        itemOrder.status = status;
        return await this.itemOrderRepository.save(itemOrder);
    }
}

// declare const userService: UserService;
// declare const addressService: AddressService;

// const itemOrderRepository = AppDataSource.getRepository(ItemOrder);
// const itemOrderService = new ItemOrderService(itemOrderRepository, userService, addressService);