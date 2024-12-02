import { AppDataSource } from "../config/ormconfig";
import { Tag } from "../entities/tag.entity";
import { injectable, inject } from 'tsyringe';
import { Repository, EntityManager } from "typeorm";
import { REPOSITORY_TOKENS } from "../config/constants";

@injectable()
export class TagService {
    constructor(
        @inject(REPOSITORY_TOKENS.TagRepository) private tagRepository: Repository<Tag>,
    ) { }

    async createTag(tag_name: string): Promise<number> {
        const tagExists = await this.tagRepository.findOne({ where: { tag_name } })
        if (tagExists) {
            return tagExists.tag_key;
        } else {
            const newTag = this.tagRepository.create({
                tag_name
            });
            const savedTag = await this.tagRepository.save(newTag);
            return savedTag.tag_key;
        }
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