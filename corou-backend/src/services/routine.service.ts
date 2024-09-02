import { AppDataSource } from "../config/ormconfig";
import { Routine } from "../entities/routine.entity";

export class RoutineService {
    private routineRepository = AppDataSource.getRepository(Routine);

    // 루틴 등록
    async createRoutine(user_key: number, routine_name: string, steps: number): Promise<Routine> {
        const newRoutine = this.routineRepository.create({
            user_key,
            routine_name,
            steps
        });
        return await this.routineRepository.save(newRoutine);
    }
    // 모든 루틴 조회
    async getAllRoutines(user_key: number): Promise<Routine[]> {
        const routines = await this.routineRepository.find({ where: { user_key } });
        if (!routines) {
            throw new Error('해당 유저의 루틴을 찾을 수 없습니다.');
        }
        return routines;
    }
    // 루틴 조회
    async getRoutine(routine_key: number): Promise<Routine> {
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
        const routine = await this.routineRepository.findOneBy({ routine_key });
        if (!routine) {
            throw new Error('해당 루틴을 찾을 수 없습니다.');
        }
        return await this.routineRepository.remove(routine);
    }
}