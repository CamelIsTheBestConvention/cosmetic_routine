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