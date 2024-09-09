import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { OrderDetail } from '../entities/order-detail.entity';
import { ItemOrderService } from './item-order.service';
import { ItemService } from './item.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class OrderDetailService {
    constructor(
        @inject('OrderDetailRepository') private orderDetailRepository: Repository<OrderDetail>,
        @inject('ItemOrderService') private itemOrderService: ItemOrderService,
        @inject('ItemService') private itemService: ItemService
    ) { }

    async createOrderDetail(count: number, purchase_price: number, item_key: number, order_key: number): Promise<OrderDetail> {
        const item = await this.itemService.getItem(item_key);
        if (!item) {
            throw new Error('해당 상품을 찾을 수 없습니다.');
        }
        const order = await this.itemOrderService.getItemOrderByKey(order_key);
        if (!order) {
            throw new Error('해당 주문을 찾을 수 없습니다.');
        }
        const newOrderDetail = this.orderDetailRepository.create({
            count,
            purchase_price,
            item,
            item_order: order
        });
        return await this.orderDetailRepository.save(newOrderDetail);
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