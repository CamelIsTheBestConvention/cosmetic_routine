import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { RoutineSkinRelation } from '../entities/routine-skin-relation.entity';
import { SkinAttribute } from '../entities/skin-attribute.entity';
import { Routine } from '../entities/routine.entity';
import { RoutineService } from './routine.service';
import { SkinAttributeService } from './skin-attribute.service';
import { injectable, inject } from 'tsyringe';



@injectable()
export class RoutineSkinRelationService {

    constructor(
        @inject(REPOSITORY_TOKENS.RoutineSkinRelationRepository) private routineSkinRelationRepository: Repository<RoutineSkinRelation>,
        @inject(REPOSITORY_TOKENS.SkinAttributeRepository) private skinAttributeRepository: Repository<SkinAttribute>,
        @inject(REPOSITORY_TOKENS.RoutineRepository) private routineRepository: Repository<Routine>,
        private skinAttributeService: SkinAttributeService,
    ) { }


    async addRoutineSkinRelation(routine_key: number, attr_key: number, transactionalEntityManager: EntityManager): Promise<RoutineSkinRelation> {
        const relation = this.routineSkinRelationRepository.create({
            routine_key,
            attr_key
        });
        return transactionalEntityManager.save(RoutineSkinRelation, relation);
    }
    async getRoutineSkinRelationByAttrKey(attr_key: number): Promise<RoutineSkinRelation[]> {
        return this.routineSkinRelationRepository.find({
            where: {
                attr_key
            }
        });
    }

    async deleteRoutineSkinRelation(routine_key: number, transactionalEntityManager: EntityManager): Promise<void> {
        await transactionalEntityManager.delete(RoutineSkinRelation, { routine_key })
    }
}