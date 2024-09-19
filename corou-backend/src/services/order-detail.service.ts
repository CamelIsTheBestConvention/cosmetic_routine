import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
// import { AppDataSource } from '../config/ormconfig';
import { OrderDetail } from '../entities/order-detail.entity';
import { ItemOrderService } from './item-order.service';
import { ItemService } from './item.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class OrderDetailService {
    constructor(
        @inject(REPOSITORY_TOKENS.OrderDetailRepository) private orderDetailRepository: Repository<OrderDetail>,
        private itemOrderService: ItemOrderService,
        private itemService: ItemService,
    ) { }

    async createOrderDetail(
        count: number,
        purchase_price: number,
        item_key: number,
        order_key: number,
        transactionalEntityManager: EntityManager
    ): Promise<OrderDetail> {
        const item = await this.itemService.getItemByKey(item_key);
        if (!item) {
            throw new Error('해당 상품을 찾을 수 없습니다.');
        }

        const newOrderDetail = this.orderDetailRepository.create({
            item_key,
            order_key,
            count,
            purchase_price,
        });
        return transactionalEntityManager.save(OrderDetail, newOrderDetail);
    }

    async getAllOrderDetail(order_key: number): Promise<OrderDetail[]> {
        const orderDetails = await this.orderDetailRepository.find({ where: { item_order: { order_key } } });
        if (!orderDetails.length) {
            throw new Error('해당 주문 정보를 찾을 수 없습니다.');
        }
        return orderDetails;
    }
}

// declare const itemOrderService: ItemOrderService;
// declare const itemService: ItemService;

// const orderDetailRepository = AppDataSource.getRepository(OrderDetail);
// const orderDetailService = new OrderDetailService(orderDetailRepository, itemOrderService, itemService);