import { Repository, EntityManager } from 'typeorm';
import { REPOSITORY_TOKENS } from '../config/constants';
import { RoutineDetail } from '../entities/routine-detail.entity';
import { RoutineService } from './routine.service';
import { ItemService } from './item.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class RoutineDetailService {
    constructor(
        @inject(REPOSITORY_TOKENS.RoutineDetailRepository) private routineDetailRepository: Repository<RoutineDetail>,
        // private routineService: RoutineService,
        private itemService: ItemService
    ) { }

    // 루틴 단계 생성
    async createRoutineDetail(
        step_number: number,
        routine_key: number,
        item_key: number,
        step_name: string,
        description: string,
        transactionalEntityManager: EntityManager
    ): Promise<RoutineDetail> {
        console.log(step_number, routine_key, item_key, step_name, description)
        const item = await this.itemService.getItemByKey(item_key);
        console.log(item)
        if (!item) {
            throw new Error('해당 아이템을 찾을 수 없습니다.');
        }
        console.log('step adding');
        const routineDetail = this.routineDetailRepository.create({
            step_number,
            routine_key,
            item,
            step_name,
            description
        });
        try {
            const savedDetail = await transactionalEntityManager.save(RoutineDetail, routineDetail);
            console.log('Routine Detail Saved:', savedDetail);
            return savedDetail;
            // return transactionalEntityManager.save(RoutineDetail, routineDetail);
        } catch (error) {
            console.error('Error saving routine detail:', error);
            throw error;
        }
    }

    // 루틴 상세 조회
    async getAllRoutineDetails(routine_key: number) {
        const routineDetails = await this.routineDetailRepository.find({ where: { routine: { routine_key } } });
        if (!routineDetails.length) {
            throw new Error('해당 루틴의 상세 정보를 찾을 수 없습니다.');
        }
        return routineDetails;
    }

    // 루틴 상세 수정
    async updateRoutineDetail(step_number: number, routine_key: number, item_key: number, step_name: string, description: string) {
        const routineDetail = await this.routineDetailRepository.findOne({ where: { step_number, routine: { routine_key } } });
        if (!routineDetail) {
            throw new Error('해당 루틴 상세 정보를 찾을 수 없습니다.');
        }

        if (item_key !== routineDetail.item.item_key) {
            const item = await this.itemService.getItemByKey(item_key);
            if (!item) {
                throw new Error('해당 아이템을 찾을 수 없습니다.');
            }
            routineDetail.item = item;
        }

        routineDetail.step_name = step_name;
        routineDetail.description = description;

        return await this.routineDetailRepository.save(routineDetail);
    }

    // 루틴 상세 삭제
    async deleteRoutineDetail(step_number: number, routine_key: number) {
        const routineDetail = await this.routineDetailRepository.findOne({ where: { step_number, routine: { routine_key } } });
        if (!routineDetail) {
            throw new Error('해당 루틴 상세 정보를 찾을 수 없습니다.');
        }
        return await this.routineDetailRepository.remove(routineDetail);
    }
}

// declare const routineService: RoutineService;
// declare const itemService: ItemService;

// const routineDetailRepository = AppDataSource.getRepository(RoutineDetail);
// const routineDetailService = new RoutineDetailService(routineDetailRepository, routineService, itemService);