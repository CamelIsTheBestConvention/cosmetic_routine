import { AppDataSource } from "../config/ormconfig";
import { SkinAttribute } from "../entities/skin-attribute.entity";
import { injectable, inject } from 'tsyringe';

@injectable()
export class SkinAttributeService {
    private skinAttributeRepository = AppDataSource.getRepository(SkinAttribute);

    // 피부속성 등록 (admin)
    async createSkinAttribute(attr_name: string): Promise<SkinAttribute> {
        const newSkinAttribute = this.skinAttributeRepository.create({
            attr_name
        });
        return await this.skinAttributeRepository.save(newSkinAttribute);
    }

    // 피부속성 조회 by key
    async getSkinAttributeByKey(attr_key: number): Promise<SkinAttribute> {
        const skinAttribute = await this.skinAttributeRepository.findOneBy({ attr_key });
        if (!skinAttribute) {
            throw new Error('피부속성을 찾을 수 없습니다.');
        }
        return skinAttribute;
    }
}