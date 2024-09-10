import { Repository, DataSource } from 'typeorm';
import { Routine } from "../entities/routine.entity";
import { UserService } from "./user.service";
import { RoutineDetailService } from './routine-detail.service';
import { injectable, inject } from 'tsyringe';

@injectable()
export class RoutineService {

    constructor(
        @inject('RoutineRepository') private routineRepository: Repository<Routine>,
        private userService: UserService,
        private routineDetailService: RoutineDetailService,
        private dataSource: DataSource
    ) { }

    // 루틴 등록
    async createRoutine(
        user_key: number,
        routine_name: string,
        steps: number,
        details: Array<{
            item_key: number;
            step_name: string;
            description: string;
        }>
    ): Promise<Routine> {
        const user = await this.userService.getUserByKey(user_key);
        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }
        return this.dataSource.transaction(async transactionalEntityManager => {
            const newRoutine = await transactionalEntityManager.save(Routine, {
                user,
                routine_name,
                steps
            });

            for (const detail of details) {
                await this.routineDetailService.createRoutineDetail(
                    newRoutine.routine_key,
                    detail.item_key,
                    detail.step_name,
                    detail.description,
                    transactionalEntityManager
                );
            }
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
}

