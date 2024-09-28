import { Repository, DataSource } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { injectable, inject } from 'tsyringe';
import { Routine } from "../entities/routine.entity";
import { UserService } from "./user.service";
import { RoutineDetailService } from './routine-detail.service';
import { RoutineSkinRelationService } from './routine-skin-relation.service';
import { TagService } from './tag.service';
import { RoutineTagRelationService } from './routine-tag-relation.service';
import { ReviewService } from './review.service';
import { connect } from 'http2';
// import { SkinAttributeService } from './skin-attribute.service';

@injectable()
export class RoutineService {

    constructor(
        @inject(REPOSITORY_TOKENS.RoutineRepository) private routineRepository: Repository<Routine>,
        // @inject(REPOSITORY_TOKENS.ReviewRepository) private reviewRepository: Repository<Review>,
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
            step_number: number;
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
        console.log(details);
        return this.dataSource.transaction(async transactionalEntityManager => {
            const newRoutine = await transactionalEntityManager.save(Routine, {
                user,
                routine_name,
                steps,
                for_gender,
                for_age,
                price_total: 0
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
                console.log(detail);
                await this.routineDetailService.createRoutineDetail(
                    detail.step_number,
                    newRoutine.routine_key,
                    detail.item_key,
                    detail.step_name,
                    detail.description,
                    transactionalEntityManager
                );
            }
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

            const total = await transactionalEntityManager
                .createQueryBuilder()
                .select('SUM(item_price)', 'total_price')
                .from('routine_detail', 'rd')
                .innerJoin('item', 'item', 'rd.item_key = item.item_key')
                .where('rd.routine_key = :routine_key', { routine_key: newRoutine.routine_key })
                .getRawOne();

            newRoutine.price_total = total.total_price;
            await transactionalEntityManager.save(Routine, newRoutine);

            return newRoutine;

        });
    }
    // 모든 루틴 조회
    async getAllRoutines(
        sort?: string,
        order: 'ASC' | 'DESC' = 'DESC',
        page: number = 1,
        size: number = 10,
        filter?: { [key: string]: any }
        // ): Promise<{ routine: Routine, attr_keys: number[] }[]> {
    ): Promise<Routine[]> {
        const queryBuilder = this.routineRepository.createQueryBuilder('routine');

        // Apply filters if provided
        if (filter) {
            Object.keys(filter).forEach(key => {
                if (Array.isArray(filter[key])) {
                    queryBuilder.andWhere(`routine.${key} IN (:...${key})`, { [key]: filter[key] });
                } else {
                    queryBuilder.andWhere(`routine.${key} = :${key}`, { [key]: filter[key] });
                }
            });
        }

        if (sort) {
            queryBuilder.orderBy(sort, order);
        }

        queryBuilder.skip((page - 1) * size).take(size);
        queryBuilder.leftJoin('routine.user', 'user').addSelect(['user.username']);

        // Join with routine_skin_relation to get attr_key values
        // queryBuilder.leftJoinAndSelect('routine.routine_skin_relations', 'routineSkinRelation')
        queryBuilder.leftJoin('routine.routine_skin_relations', 'routineSkinRelation').addSelect('routineSkinRelation.attr_key');

        const routines = await queryBuilder.getMany();
        console.log(routines);

        return routines;

    }
    // 루틴 조회
    async getRoutineByKey(routine_key: number): Promise<Routine> {
        console.log(routine_key);

        const routine = await this.dataSource
            .createQueryBuilder(Routine, 'routine')
            .leftJoinAndSelect('routine.routineDetails', 'routineDetails')
            .leftJoin('routine.user', 'user')
            .addSelect(['user.username'])
            .leftJoinAndSelect('routine.routine_skin_relations', 'routineSkinRelation')
            .leftJoinAndSelect('routine.routine_tag_relations', 'routineTagRelation')
            .where('routine.routine_key = :routine_key', { routine_key })
            .andWhere('routineTagRelation.routine = :routine_key', { routine_key })
            .getOne();
        console.log(routine);
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }

        return routine;
    }
    // 루틴 수정
    async updateRoutine(
        user_key: number,
        routine_key: number,
        routine_name: string,
        steps: number,
        for_age: number,
        for_gender: "M" | "F" | "A",
        for_skin: number,
        for_problem: Array<string>,
        details: any
    ): Promise<Routine> {
        return this.dataSource.transaction(async transactionalEntityManager => {
            const foundRoutine = await this.routineRepository.findOne({ where: { routine_key }, relations: ['user'] });
            if (!foundRoutine) {
                throw new Error('루틴을 찾지 못했습니다.');
            }
            if (foundRoutine.user.user_key !== user_key) {
                throw new Error('수정 권한이 없습니다.');
            }
            const old_steps = foundRoutine.steps;
            await transactionalEntityManager.update(Routine, { routine_key }, {
                routine_name,
                steps,
                for_gender,
                for_age,
            })

            await this.routineSkinRelationService.deleteRoutineSkinRelation(routine_key, transactionalEntityManager)
            await this.routineSkinRelationService.addRoutineSkinRelation(
                routine_key,
                for_skin,
                transactionalEntityManager
            );
            for (const problem of for_problem) {
                await this.routineSkinRelationService.addRoutineSkinRelation(
                    routine_key,
                    Number(problem),
                    transactionalEntityManager
                );
            }
            if (steps <= old_steps) {
                for (let i = 1; i <= steps; i++) {
                    await this.routineDetailService.updateRoutineDetail(i, routine_key, details[i - 1].item_key, details[i - 1].step_name, details[i - 1].description, transactionalEntityManager);
                }
                if (steps < old_steps) {
                    for (let i = steps + 1; i <= old_steps; i++) {
                        await this.routineDetailService.deleteRoutineDetail(i, routine_key);
                    }
                }
            } else {
                for (let i = 1; i <= old_steps; i++) {

                    await this.routineDetailService.updateRoutineDetail(i, routine_key, details[i - 1].item_key, details[i - 1].step_name, details[i - 1].description, transactionalEntityManager);
                }
                for (let i = old_steps + 1; i <= steps; i++) {
                    await this.routineDetailService.createRoutineDetail(i, routine_key, details[i - 1].item_key, details[i - 1].step_name, details[i - 1].description, transactionalEntityManager)
                }
            }
            const updatedRoutine = await transactionalEntityManager.findOne(Routine, { where: { routine_key } });
            if (!updatedRoutine) {
                throw new Error('루틴 업데이트에 오류가 발생했습니다.')
            }
            const total = await transactionalEntityManager
                .createQueryBuilder()
                .select('SUM(item_price)', 'total_price')
                .from('routine_detail', 'rd')
                .innerJoin('item', 'item', 'rd.item_key = item.item_key')
                .where('rd.routine_key = :routine_key', { routine_key: updatedRoutine.routine_key })
                .getRawOne();

            updatedRoutine.price_total = total.total_price;

            await transactionalEntityManager.save(Routine, updatedRoutine);

            return updatedRoutine;
        })
    }
    // 루틴 삭제
    async deleteRoutine(routine_key: number): Promise<void> {
        const routine = await this.routineRepository.findOne({
            where: { routine_key },
            relations: ['reviews', 'routineDetails', 'routine_skin_relations', 'routine_tag_relations']
        })
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        this.routineRepository.remove(routine);
    }

    async updateRoutineRating(routine_key: number, average_rating: number): Promise<void> {
        await this.routineRepository.update(routine_key, { average_rating });
    }

    async searchRoutine(query: string): Promise<Routine[]> {
        return this.routineRepository.createQueryBuilder('routine')
            .where('routine.routine_name LIKE :query', { query: `%${query}%` })
            .leftJoin('routine.user', 'user').addSelect(['user.username'])
            .getMany();
    }
}
