import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ItemService } from '../services/item.service';

@injectable()
export class ItemController {
    constructor(private itemService: ItemService) { }

    async createItem(req: Request, res: Response): Promise<void> {
        const { item_name, item_price, description, category } = req.body;
        const item = await this.itemService.createItem(item_name, item_price, description, category);
        res.status(201).json(item);
    }

    async getAllItems(req: Request, res: Response): Promise<void> {
        try {
            const { sort, order, page, size, ...filter } = req.query;

            Object.keys(filter).forEach(key => {
                if (!Array.isArray(filter[key])) {
                    filter[key] = [filter[key] as string];
                }
            });

            const items = await this.itemService.getAllItems(
                sort as string,
                order as 'ASC' | 'DESC',
                page ? parseInt(page as string) : undefined,
                size ? parseInt(size as string) : undefined,
                filter as { [key: string]: any }
            );
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: '아이템 조회에 실패했습니다.' });
        }
    }

    async getItemByKey(req: Request, res: Response): Promise<void> {
        const item_key = req.params.item_key;
        const item = await this.itemService.getItemByKey(Number(item_key));
        res.status(200).json(item);
    }

    async getItemByName(req: Request, res: Response): Promise<void> {
        const item_name = req.params.item_name;
        const item = await this.itemService.getItemByName(item_name);
        res.status(200).json(item);
    }

    async updateItem(req: Request, res: Response): Promise<void> {
    }
}