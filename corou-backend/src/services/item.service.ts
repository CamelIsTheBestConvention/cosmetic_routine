import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { Item } from '../entities/item.entity';
import { injectable, inject } from 'tsyringe';

@injectable()
export class ItemService {
    constructor(@inject('ItemRepository') private itemRepository: Repository<Item>) {
    }
    // 상품 등록 
    async createItem(item_name: string, item_price: number, description: string, category: string): Promise<Item> {
        const newItem = this.itemRepository.create({
            item_name,
            item_price,
            description,
            category
        });
        if (!newItem) {
            throw new Error('상품 등록 실패');
        }
        return await this.itemRepository.save(newItem);
    }
    // 모든 상품 조회
    async getAllItems() {
        const items = await this.itemRepository.find();
        if (!items) {
            throw new Error('상품 정보를 불러올 수 없습니다.');
        }
        return items;
    }
    // 상품 조회
    async getItem(item_key: number): Promise<Item> {
        const item = await this.itemRepository.findOneBy({ item_key });
        if (!item) {
            throw new Error('해당 아이템을 찾을 수 없습니다.');
        }
        return item;
    }
    // 상품 정보 수정
    async updateItem(item_key: number, item_name: string, item_price: number, item_image: string, description: string, category: string): Promise<Item> {
        const item = await this.itemRepository.findOneBy({ item_key });
        if (!item) {
            throw new Error('해당 아이템을 찾을 수 없습니다.');
        }
        item.item_name = item_name;
        item.item_price = item_price;
        item.description = description;
        item.category = category;
        return await this.itemRepository.save(item);
    }
}
