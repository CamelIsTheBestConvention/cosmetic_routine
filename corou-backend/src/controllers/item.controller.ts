import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ItemService } from '../services/item.service';

@injectable()
export class ItemController {
    constructor(private itemService: ItemService) { }

    async createItem(req: Request, res: Response): Promise<void> {
        const { item_name, item_type, item_unit, item_price } = req.body;
    }

    async getAllItems(req: Request, res: Response): Promise<void> {
        const items = await this.itemService.getAllItems();
        res.status(200).json(items);
    }

    async getItemByKey(req: Request, res: Response): Promise<void> {
        const item_key = req.params.item_key;
        const item = await this.itemService.getItemByKey(Number(item_key));
        res.status(200).json(item);
    }

    async updateItem(req: Request, res: Response): Promise<void> {
    }
}