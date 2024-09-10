import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { UserSkinRelation } from '../entities/user-skin-relation.entity';
import { UserService } from './user.service';
import { SkinAttributeService } from './skin-attribute.service';
import { injectable, inject } from 'tsyringe';



@injectable()
export class UserSkinRelationService {

    constructor(
        @inject(REPOSITORY_TOKENS.UserSkinRelationRepository) private userSkinRelationRepository: Repository<UserSkinRelation>,
        // private userService: UserService,
        private skinAttributeService: SkinAttributeService,
    ) { }


    async addUserSkinRelation(user_key: number, attr_key: number, transactionalEntityManager: EntityManager): Promise<UserSkinRelation> {
        const relation = this.userSkinRelationRepository.create({
            user_key,
            attr_key
        });
        return transactionalEntityManager.save(UserSkinRelation, relation);
    }
    // async addUserSkinRelation(user_key: number, attr_key: number): Promise<void> {
    //     const user = await this.userService.getUserByKey(user_key);
    //     const attribute = await this.skinAttributeService.getSkinAttributeByKey(attr_key);
    //     const userSkinRelation = this.userSkinRelationRepository.create({
    //         user,
    //         attribute
    //     });

    //     await this.userSkinRelationRepository.save(userSkinRelation);
    // }
}