import { Repository, DataSource } from 'typeorm';
import { ItemOrder } from '../entities/item-order.entity';
import { UserService } from './user.service';
import { AddressService } from './address.service';
import { OrderDetailService } from './order-detail.service';
import { injectable, inject } from 'tsyringe';
import { REPOSITORY_TOKENS } from '../config/constants';

@injectable()
export class ItemOrderService {
    constructor(
        @inject(REPOSITORY_TOKENS.ItemOrderRepository) private itemOrderRepository: Repository<ItemOrder>,
        private userService: UserService,
        private addressService: AddressService,
        private orderDetailService: OrderDetailService,
        private dataSource: DataSource,
    ) { }

    // 주문 생성
    async createItemOrder(
        user_key: number,
        addr_key: number,
        price_total: number,
        items: { count: number, purchase_price: number, item_key: number }[]
    ): Promise<ItemOrder> {
        const user = await this.userService.getUserByKey(user_key);
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        const address = await this.addressService.getOneAddress(user_key, addr_key);
        if (!address) {
            throw new Error('해당 주소를 찾을 수 없습니다.');
        }

        return this.dataSource.transaction(async (transactionalEntityManager) => {
            const newItemOrder = await transactionalEntityManager.save(ItemOrder, {
                user,
                address,
                order_at: new Date(),
                status: 'ORDERED',
                price_total
            });

            for (const item of items) {
                await this.orderDetailService.createOrderDetail(
                    item.count,
                    item.purchase_price,
                    item.item_key,
                    newItemOrder.order_key,
                    transactionalEntityManager
                );
            }

            return newItemOrder;
        });
        // const newItemOrder = this.itemOrderRepository.create({
        //     user,
        //     address,
        //     order_at: new Date(),
        //     status: 'ORDERED',
        //     price_total
        // });
        // return await this.itemOrderRepository.save(newItemOrder);
    }

    // 사용자 주문 조회 
    async getItemOrderByUser(user_key: number): Promise<ItemOrder[]> {
        const itemOrders = await this.itemOrderRepository.find({ where: { user: { user_key } } });

        return itemOrders;
    }

    // 주문 조회 by key
    async getItemOrderByKey(order_key: number, user_key: number): Promise<ItemOrder> {
        const itemOrder = await this.itemOrderRepository.findOne(
            {
                where: { order_key },
                relations: ['orderDetails']
            });
        if (!itemOrder) {
            throw new Error('주문을 찾을 수 없습니다.');
        }
        if (itemOrder.user.user_key !== user_key) {
            throw new Error('주문 조회 권한이 없습니다.');
        }
        const orderDetails = await this.orderDetailService.getAllOrderDetail(order_key);
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