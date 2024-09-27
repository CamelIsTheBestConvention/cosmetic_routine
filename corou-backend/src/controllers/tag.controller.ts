import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { TagService } from "../services/tag.service";

@injectable()
export class TagController {
  constructor(private tagService: TagService) {}

  async getTagByKey(req: Request, res: Response) {
    const { tag_key } = req.params;
    try {
      const tag = await this.tagService.getTagByKey(Number(tag_key));
      res.status(200).json(tag.tag_name);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }
}
