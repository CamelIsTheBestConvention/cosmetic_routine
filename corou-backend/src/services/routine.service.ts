import { Repository, DataSource } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { injectable, inject } from 'tsyringe';
import { Routine } from "../entities/routine.entity";
import { UserService } from "./user.service";
import { RoutineDetailService } from './routine-detail.service';
import { RoutineSkinRelationService } from './routine-skin-relation.service';
import { TagService } from './tag.service';
import { RoutineTagRelationService } from './routine-tag-relation.service';
// import { SkinAttributeService } from './skin-attribute.service';

@injectable()
export class RoutineService {

    constructor(
        @inject(REPOSITORY_TOKENS.RoutineRepository) private routineRepository: Repository<Routine>,
        private userService: UserService,
        private routineDetailService: RoutineDetailService,
        private routineSkinRelationService: RoutineSkinRelationService,
        private routineTagRelationService: RoutineTagRelationService,
        private tagService: TagService,
        private dataSource: DataSource
    ) { }

    // 루틴 등록
    async createRoutine(
        user_key: number,
        routine_name: string,
        steps: number,
        for_gender: 'M' | 'F' | 'A',
        for_skin: number,
        for_age: number,
        for_problem: Array<string>,
        details: Array<{
            item_key: number;
            step_name: string;
            description: string;
        }>,
        tags: Array<string>
    ): Promise<Routine> {
        const user = await this.userService.getUserByKey(user_key);
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        return this.dataSource.transaction(async transactionalEntityManager => {
            const newRoutine = await transactionalEntityManager.save(Routine, {
                user,
                routine_name,
                steps,
                for_gender,
                for_age,
            });
            await this.routineSkinRelationService.addRoutineSkinRelation(
                newRoutine.routine_key,
                for_skin,
                transactionalEntityManager
            );
            for (const problem of for_problem) {
                await this.routineSkinRelationService.addRoutineSkinRelation(
                    newRoutine.routine_key,
                    Number(problem),
                    transactionalEntityManager
                );
            }
            for (const detail of details) {
                await this.routineDetailService.createRoutineDetail(
                    newRoutine.routine_key,
                    detail.item_key,
                    detail.step_name,
                    detail.description,
                    transactionalEntityManager
                );
            }
            console.log(tags);
            const tagKeys = [];
            for (const tag of tags) {
                const tagKey = await this.tagService.createTag(tag);
                tagKeys.push(tagKey);
            }
            console.log(tagKeys);
            for (const tagKey of tagKeys) {
                await this.routineTagRelationService.addRoutineTagRelation(
                    newRoutine.routine_key,
                    tagKey,
                    transactionalEntityManager
                );
            }
            console.log('루틴 태그 등록 완료')
            return newRoutine;
        });
    }
    // 모든 루틴 조회
    async getAllRoutines(): Promise<Routine[]> {
        const routines = await this.routineRepository.find();
        if (!routines) {
            throw new Error('해당 유저의 루틴을 찾을 수 없습니다.');
        }
        return routines;
    }
    // 루틴 조회
    async getRoutineByKey(routine_key: number): Promise<Routine> {
        const routine = await this.routineRepository.findOneBy({ routine_key });
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        return routine;
    }
    // 루틴 수정
    async updateRoutine(routine_key: number, routine_name: string, steps: number): Promise<Routine> {
        const routine = await this.routineRepository.findOneBy({ routine_key });
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        routine.routine_name = routine_name;
        routine.steps = steps;
        return await this.routineRepository.save(routine);
    }
    // 루틴 삭제
    async deleteRoutine(routine_key: number): Promise<Routine> {
        return this.dataSource.transaction(async transactionalEntityManager => {
            const routine = await transactionalEntityManager.findOne(Routine, {
                where: { routine_key },
                relations: ['routineDetails']
            });
            if (!routine) {
                throw new Error('해당 루틴을 찾을 수 없습니다.');
            }
            await transactionalEntityManager.remove(routine);
            return routine;
        });
    }
    // 피부 타입 필터로 루틴 조회
    async getRoutinesBySkinType(attr_key: number): Promise<Routine[]> {
        const routineSkinRelations = await this.routineSkinRelationService.getRoutineSkinRelationByAttrKey(attr_key);
        const routines = [];
        for (const routineSkinRelation of routineSkinRelations) {
            const routine = await this.routineRepository.findOneBy({ routine_key: routineSkinRelation.routine_key });
            if (routine) {
                routines.push(routine);
            }
        }
        return routines;
    }
}

