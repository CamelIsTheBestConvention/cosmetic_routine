import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { RoutineSkinRelation } from '../entities/routine-skin-relation.entity';
import { RoutineService } from './routine.service';
import { SkinAttributeService } from './skin-attribute.service';
import { injectable, inject } from 'tsyringe';



@injectable()
export class RoutineSkinRelationService {

    constructor(
        @inject(REPOSITORY_TOKENS.RoutineSkinRelationRepository) private routineSkinRelationRepository: Repository<RoutineSkinRelation>,
        // private userService: UserService,
        private skinAttributeService: SkinAttributeService,
    ) { }


    async addRoutineSkinRelation(routine_key: number, attr_key: number, transactionalEntityManager: EntityManager): Promise<RoutineSkinRelation> {
        const relation = this.routineSkinRelationRepository.create({
            routine_key,
            attr_key
        });
        return transactionalEntityManager.save(RoutineSkinRelation, relation);
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