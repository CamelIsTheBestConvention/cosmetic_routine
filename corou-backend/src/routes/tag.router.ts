import { Router } from 'express';
import { container } from 'tsyringe';
import { TagController } from '../controllers/tag.controller';

export function setupTagRouter(): Router {
    const router = Router();
    const tagController = container.resolve(TagController);

    router.get("/:tag_key", (req, res) => tagController.getTagByKey(req, res));
    
    return router;
}
