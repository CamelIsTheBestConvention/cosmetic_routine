import { AppDataSource } from "../config/ormconfig";
import { Tag } from "../entities/tag.entity";
import { injectable, inject } from 'tsyringe';

@injectable()
export class TagService {
    private tagRepository = AppDataSource.getRepository(Tag);

    // 태그 등록 (admin)
    async createTag(tag_name: string): Promise<number> {
        const tagExists = await this.tagRepository.findOne({ where: { tag_name } })
        if (tagExists) {
            return tagExists.tag_key;
        }
        const newTag = this.tagRepository.create({
            tag_name
        });
        return newTag.tag_key;
    }

    // 피부속성 조회 by key
    async getTagByKey(tag_key: number): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({ tag_key });
        if (!tag) {
            throw new Error('태그를 찾을 수 없습니다.');
        }
        return tag;
    }
}