import { Repository } from 'typeorm';
// import { AppDataSource } from '../config/ormconfig';
import { RoutineDetail } from '../entities/routine-detail.entity';
import { RoutineService } from './routine.service';
import { ItemService } from './item.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class RoutineDetailService {
    constructor(
        @inject('RoutineDetailRepository') private routineDetailRepository: Repository<RoutineDetail>,
        @inject('RoutineService') private routineService: RoutineService,
        @inject('ItemService') private itemService: ItemService
    ) { }

    // 루틴 단계 생성
    async createRoutineDetail(routine_key: number, item_key: number, step_name: string, description: string): Promise<RoutineDetail> {
        const routine = await this.routineService.getRoutine(routine_key);
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        const item = await this.itemService.getItem(item_key);
        if (!item) {
            throw new Error('해당 아이템을 찾을 수 없습니다.');
        }

        const newRoutineDetail = this.routineDetailRepository.create({
            routine,
            item,
            step_name,
            description
        });
        if (!newRoutineDetail) {
            throw new Error('루틴 상세 정보를 등록할 수 없습니다.');
        }
        return await this.routineDetailRepository.save(newRoutineDetail);
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
            const item = await this.itemService.getItem(item_key);
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