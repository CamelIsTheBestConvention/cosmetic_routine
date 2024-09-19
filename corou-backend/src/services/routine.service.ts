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
                console.log('step added');
            }
            console.log('before tag')
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
    ): Promise<Routine[]> {
        const queryBuilder = this.routineRepository.createQueryBuilder('routine');

        if (filter) {
            Object.keys(filter).forEach(key => {
                queryBuilder.andWhere(`routine.${key} = :${key}`, { [key]: filter[key] });
            });
        }

        if (sort) {
            queryBuilder.orderBy(sort, order);
        }

        queryBuilder.skip((page - 1) * size).take(size);
        queryBuilder.leftJoin('routine.user', 'user').addSelect(['user.username']);

        const routines = await queryBuilder.getMany();
        console.log(routines);
        return routines;
    }
    // 루틴 조회
    async getRoutineByKey(routine_key: number): Promise<Routine> {
        console.log(routine_key);
        // const routine = await this.routineRepository.findOne({
        //     where: { routine_key },
        //     relations: ['routineDetails', 'user.username']
        //     // relations: ['routineDetails', 'routineSkinRelations', 'routineTagRelations', 'user', 'reviews']
        // });
        const routine = await this.dataSource
            .createQueryBuilder(Routine, 'routine')
            .leftJoinAndSelect('routine.routineDetails', 'routineDetails')
            .leftJoin('routine.user', 'user')
            .addSelect(['user.username'])
            .leftJoinAndSelect('routine.reviews', 'reviews')
            .where('routine.routine_key = :routine_key', { routine_key })
            .getOne();
        console.log(routine);
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }

        // const reviews = await this.reviewService.getReviewByRoutine(routine_key);
        // return { ...routine, reviews };
        return routine;
    }
    // 루틴 수정
    async updateRoutine(user_key: number, routine_key: number, routine_name?: string, steps?: number, average_rating?: number): Promise<Routine> {
        const routine = await this.routineRepository.findOneBy({ routine_key });
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        if (routine.user.user_key !== user_key) {
            throw new Error('해당 루틴의 작성자가 아닙니다.');
        }
        routine.routine_name = routine_name ?? routine.routine_name;
        routine.steps = steps ?? routine.steps;
        routine.average_rating = average_rating ?? routine.average_rating;

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

    async updateRoutineRating(routine_key: number, average_rating: number): Promise<void> {
        await this.routineRepository.update(routine_key, { average_rating });
    }
}
