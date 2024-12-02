import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { RoutineTagRelation } from '../entities/routine-tag-relation.entity';
import { RoutineService } from './routine.service';
import { TagService } from './tag.service';
import { injectable, inject } from 'tsyringe';



@injectable()
export class RoutineTagRelationService {

    constructor(
        @inject(REPOSITORY_TOKENS.RoutineTagRelationRepository) private routineTagRelationRepository: Repository<RoutineTagRelation>,
        private tagService: TagService,
    ) { }


    async addRoutineTagRelation(routine_key: number, tag_key: number, transactionalEntityManager: EntityManager): Promise<RoutineTagRelation> {
        const relation = this.routineTagRelationRepository.create({
            routine_key,
            tag_key
        });
        const savedRelation = await transactionalEntityManager.save(RoutineTagRelation, relation);
        return savedRelation;
    }
}